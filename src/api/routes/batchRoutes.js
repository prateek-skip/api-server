const express = require('express');
const multer = require('multer');
const { handleMasterMappingBatch } = require('../controllers/Batch/BatchController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post("/mmv-master-mapping", upload.single('file'), async (req, res, next) => {
  try {
    const apiData = await handleMasterMappingBatch(req, res);
    console.log(apiData);

    // res.status(200).json({
    //   message: "Request successful.",
    //   data: apiData,
    // });
  } catch (error) {
    next(error);
  }
});

router.post("/process-file", upload.single('ProcessedFile'), async (req, res, next) => {
  try {
    const apiData = await handleProcessedFile(req, res);

    // res.status(200).json({
    //   message: "Request successful.",
    //   data: apiData,
    // });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
