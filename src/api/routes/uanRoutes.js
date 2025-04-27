const express = require("express");
const router = express.Router();
const pfController = require("../controllers/UAN/epfo");
const { otherLogger } = require("../logger/otherApiLogger");
const uuid = require("uuid")


router.post("/pf-passbook-without-otp", async (req, res, next) => {
  try {
    req.correlationId = uuid.v4();
    otherLogger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
      correlationId: req.correlationId,
      requestBody: req.body,
    });
    const start = Date.now();

    const apiData = await pfController.pfPassbookWithoutOtp(req.body);

    const duration = Date.now() - start;
    otherLogger.info(
      `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      { correlationId: req.correlationId, requestBody: {"billable":apiData.billable, "txn_id":apiData.txn_id, "status":apiData.status} }
    );
    if(apiData["error"]){
      res.status(apiData['error']?.status || 500).json(apiData)    
      return;
    }
    res.status(200).json({
      message: "Request successfull.",
      data: apiData,
    });
  } catch (error) {
    otherLogger.error(
      `Error response: ${req.method} ${req.originalUrl} ${res.statusCode}`,
      { correlationId: req.correlationId, requestBody: error.message }
    );
    next(error);
  }
});

module.exports = router;
