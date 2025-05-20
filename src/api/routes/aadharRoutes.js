const express = require("express");
const router = express.Router();
const aadharController = require("../controllers/Aadhar/aadharController");
const { logger } = require("../logger/logger");
const { validApiKey } = require('../../config/constants');
const uuid = require("uuid")
const { isValidAadhaar } = require('../../config/utilities');


/**
 * GET request to /books
 */

router.post("/mask-aadhar", async (req, res, next) => {
  const apiData = await aadharController.maskAadhar(req.body);
  // if (apiData["error"]) {
  //   res.status(apiData["error"]["status"]).json(apiData);
  //   return;
  // }
  res.status(200).json({
    message: "Request successfull.",
    data: apiData,
  });
});

router.post("/verify-aadhar", async (req, res, next) => {
  const apiData = await aadharController.verifyAadhar(req.body);
  // if (apiData["error"]) {
  //   res.status(apiData["error"]["status"]).json(apiData);
  //   return;
  // }
  res.status(200).json({
    message: "Request successfull.",
    apiData,
  });
});

router.post("/send-otp", async (req, res, next) => {
  try {
    req.correlationId = uuid.v4();
    req.body["User"] = validApiKey[req.headers["x-api-key"]];
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
      correlationId: req.correlationId,
      requestBody: req.body,
    });
    const start = Date.now();

    const aadharNumber = req.body.aadhaar;
    if (!isValidAadhaar(aadharNumber)) {
      res.status(400).json({
        "message": "Request failed.",
        "data": {
          "billable": false,
          "message": "Invalid Aadhar number.",
          "result": {}
        },
      });
      return;
    }

    const apiData = await aadharController.sendAadharOtp(req.body);

    const duration = Date.now() - start;
    logger.info(
      `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      { correlationId: req.correlationId, requestBody: { "billable": apiData.billable, "txn_id": apiData.txn_id, "status": apiData.status, "User": req.body["User"] } }
    );

    res.status(200).json({
      message: "Request successfull.",
      data: apiData,
    });
  } catch (error) {
    logger.error(
      `Error response: ${req.method} ${req.originalUrl} ${res.statusCode}`,
      { correlationId: req.correlationId, requestBody: error }
    );
    next(error);
  }
});

router.post("/download-aadhar", async (req, res, next) => {
  try {
    req.correlationId = uuid.v4();
    req.body["User"] = validApiKey[req.headers["x-api-key"]];
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
      correlationId: req.correlationId,
      requestBody: req.body,
    });

    const start = Date.now();
    // const aadharNumber = req.body.aadhaar;
    // if (!isValidAadhaar(aadharNumber)) {
    //   res.status(400).json({
    //     "message": "Request failed.",
    //     "data": {
    //       "billable": false,
    //       "message": "Invalid Aadhar number.",
    //       "result": {}
    //     },
    //   });
    //   return;
    // }
    const apiData = await aadharController.downloadAadhar(req.body);

    const duration = Date.now() - start;
    logger.info(
      `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      { correlationId: req.correlationId, requestBody: { "billable": apiData.billable, "txn_id": apiData.txn_id, "status": apiData.status, "User": req.body["User"] } }
    );

    res.status(200).json({
      message: "Request successfull.",
      data: apiData,
    });
  } catch (error) {
    logger.error(
      `Error response: ${req.method} ${req.originalUrl} ${res.statusCode}`,
      { correlationId: req.correlationId, requestBody: error }
    );
    next(error);
  }
});


router.post("/detailed/send-otp", async (req, res, next) => {
  try {
    req.correlationId = uuid.v4();
    req.body["User"] = validApiKey[req.headers["x-api-key"]];
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
      correlationId: req.correlationId,
      requestBody: req.body,
    });
    const start = Date.now();

    const aadharNumber = req.body.aadhaar;
    if (!isValidAadhaar(aadharNumber)) {
      res.status(400).json({
        "message": "Request failed.",
        "data": {
          "billable": false,
          "message": "Invalid Aadhar number.",
          "result": {}
        },
      });
      return;
    }

    const apiData = await aadharController.sendAadharOtpDetailed(req.body);

    const duration = Date.now() - start;
    logger.info(
      `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      { correlationId: req.correlationId, requestBody: { "billable": apiData.billable, "txn_id": apiData.txn_id, "status": apiData.status, "User": req.body["User"] } }
    );

    res.status(200).json({
      message: "Request successfull.",
      data: apiData,
    });
  } catch (error) {
    logger.error(
      `Error response: ${req.method} ${req.originalUrl} ${res.statusCode}`,
      { correlationId: req.correlationId, requestBody: error }
    );
    next(error);
  }
});

router.post("/download-aadhar/detailed", async (req, res, next) => {
  try {
    req.correlationId = uuid.v4();
    req.body["User"] = validApiKey[req.headers["x-api-key"]];
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
      correlationId: req.correlationId,
      requestBody: req.body,
    });

    const start = Date.now();
    const aadharNumber = req.body.aadhaar;
    // if (!isValidAadhaar(aadharNumber)) {
    //   res.status(400).json({
    //     "message": "Request failed.",
    //     "data": {
    //       "billable": false,
    //       "message": "Invalid Aadhar number.",
    //       "result": {}
    //     },
    //   });
    //   return;
    // }
    const apiData = await aadharController.downloadAadharDetailed(req.body);

    const duration = Date.now() - start;
    logger.info(
      `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      { correlationId: req.correlationId, requestBody: { "billable": apiData.billable, "txn_id": apiData.txn_id, "status": apiData.status, "User": req.body["User"] } }
    );

    delete apiData["api_name"];
    delete apiData["api_category"];
    res.status(200).json({
      message: "Request successfull.",
      data: apiData,
    });
  } catch (error) {
    logger.error(
      `Error response: ${req.method} ${req.originalUrl} ${res.statusCode}`,
      { correlationId: req.correlationId, requestBody: error }
    );
    next(error);
  }
});

module.exports = router;
