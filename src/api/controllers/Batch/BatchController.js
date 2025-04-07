const Bottleneck = require('bottleneck');
const axios = require('axios');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const excelFilePath = './data/processed-response';

function hashSHA256Base16(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

const cleanMmvResponse = (response) => {
  if (Array.isArray(response)) {
    const filtered = response.map(({ variantId, matchScore }) => ({
      variantId,
      matchScore,
    }));
    return JSON.stringify(filtered);
  }
  return response;
};

const limiter = new Bottleneck({
  maxConcurrent: 50,
  minTime: 10,
  reservoir: 1000,
  reservoirRefreshAmount: 1000,
  reservoirRefreshInterval: 2 * 1000,
});

const transformResponse = (response, originalPayload, isError) => {
  if (isError) {
    originalPayload.push(response);
    originalPayload.push('');
    return originalPayload;
  }

  const result = response.result;
  const cleanedResponse = cleanMmvResponse(result);
  const parsedResponse = JSON.parse(cleanedResponse);

  let topVariantId = '';
  if (Array.isArray(parsedResponse)) {
    topVariantId = parsedResponse[0].variantId || '';
  }

  originalPayload.push(cleanedResponse);
  originalPayload.push(topVariantId);
  return originalPayload;
};

const callApiWithRetry = async (payload, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    const originalPayload = payload.responseObject;
    originalPayload[0] = hashSHA256Base16(JSON.stringify(originalPayload[0]));
    delete payload.responseObject;

    try {
      const response = await axios.post(
        'https://api.signzy.app/api/v3/mmv-master-mapping',
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: 'GTgri571Gh0VbVfFg5TFOjE5cGqVm9fs',
          },
        }
      );
      return transformResponse(response.data, originalPayload, false);
    } catch (err) {
      if (err.response?.status === 429 && i < retries - 1) {
        const waitTime = 2 ** i * 1000;
        console.warn(`🔁 Retry #${i + 1} for payload... waiting ${waitTime}ms`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        // console.error('❌ Final failure:', err.message);
        // console.error('❌ Final failure:', err.response?.data);
        return transformResponse(err.response?.data?.error || 'Unknown error', originalPayload, true);
      }
    }
  }
};

const limitedApiCall = limiter.wrap(callApiWithRetry);

async function handleBatch(batch) {
  const results = await Promise.all(batch.map((p) => limitedApiCall(p)));
  return results;
}

function appendJsonToFile(newData, filePath, res) {
  fs.readFile(filePath, 'utf8', (readErr, fileContent) => {
    let existingData = [];

    if (readErr) {
      if (readErr.code === 'ENOENT') {
        existingData = [];
      } else {
        console.error('Error reading file:', readErr);
        return res.status(500).json({ message: 'Failed to read existing file' });
      }
    } else {
      try {
        existingData = fileContent !== '' ? JSON.parse(fileContent) : null;
        if (!Array.isArray(existingData)) {
          existingData = [existingData];
        }
      } catch (parseErr) {
        console.error('Error parsing existing JSON:', parseErr);
        return res.status(500).json({ message: 'Invalid JSON format in file' });
      }
    }

    existingData.push(...newData);

    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
        return res.status(500).json({ message: 'Failed to save updated file' });
      }

      console.log('✅ Data appended to JSON file');
    });
  });
}

const handleMasterMappingBatch = async (req, res) => {
  let rowIndex = 0;
  let data = [];

  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const fileName = req.file.originalname;
    const filePath = path.resolve(req.file.path);

    const batch = [];
    const BATCH_SIZE = 50;

    const responseWorkbook = new ExcelJS.Workbook();
    const responseSheet = responseWorkbook.addWorksheet('Results');
    const headers = [];
    const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(req.file.path, { entries: 'emit' });

    for await (const worksheetReader of workbookReader) {
      for await (const row of worksheetReader) {
        rowIndex++;

        if (rowIndex <= 2) {
          if (rowIndex === 2) {
            const headersRow = Array.isArray(row.values) ? row.values.slice(1) : [];
            headers.push(...headersRow);
            headers.push('mmvResponse');
            headers.push('BestVariantID');
            responseSheet.addRow([...headers]);
          }
          continue;
        }

        const values = Array.isArray(row.values) ? row.values.slice(1) : [];

        const payload = {
          vehicleManufacturerName: values[6],
          fuelType: values[9],
          model: values[7],
          cubicCapacity: values[40] + "",
          vehicleInsuranceCompanyName: values[22],
          rtoCode: values[69] + "",
          clientId: "AMAZONSZY",
          responseObject: values
        };

        batch.push(payload);

        if (batch.length === BATCH_SIZE) {
          const batchResult = await handleBatch(batch);
          for (const entry of batchResult) {
            responseSheet.addRow(entry);
          }
          batch.length = 0; // clear batch
        }
      }
    }

    if (batch.length > 0) {
      const batchResult = await handleBatch(batch);
      for (const entry of batchResult) {
        responseSheet.addRow(entry);
      }
    }

    fs.unlinkSync(filePath);
    await responseWorkbook.xlsx.writeFile(`${excelFilePath}_${fileName}`);

    res.json({
      message: 'File processed successfully',
      rows: data.length,
      sample: data.slice(0, 5)
    });
  } catch (err) {
    console.error('Error processing file:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { handleMasterMappingBatch };
