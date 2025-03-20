const express = require("express");
const router = express.Router();
const aadharController = require("../controllers/Aadhar/aadharController");
const { logger } = require("../logger/logger");
const uuid = require("uuid")

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
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
      correlationId: req.correlationId,
      requestBody: req.body,
    });
    const start = Date.now();

    const apiData = await aadharController.sendAadharOtp(req.body);

    const duration = Date.now() - start;
    logger.info(
      `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      { correlationId: req.correlationId, requestBody: apiData }
    );

    res.status(200).json({
      message: "Request successfull.",
      data: apiData,
    });
  } catch (error) {
    logger.error(
      `Error response: ${req.method} ${req.originalUrl} ${res.statusCode}`,
      { correlationId: req.correlationId, requestBody: error.message }
    );
    next(error);
  }
});

router.post("/download-aadhar", async (req, res, next) => {
  try {
    req.correlationId = uuid.v4();
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
      correlationId: req.correlationId,
      requestBody: req.body,
    });
    const start = Date.now();

    const apiData = await aadharController.downloadAadhar(req.body);

    const duration = Date.now() - start;
    logger.info(
      `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      { correlationId: req.correlationId, requestBody: apiData }
    );

    res.status(200).json({
      message: "Request successfull.",
      data: apiData,
    });
  } catch (error) {
    logger.error(
      `Error response: ${req.method} ${req.originalUrl} ${res.statusCode}`,
      { correlationId: req.correlationId, requestBody: error.message }
    );
    next(error);
  }
});

module.exports = router;
