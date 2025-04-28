const express = require('express');
const router = express.Router();
const panController = require('../controllers/PAN/pan');
const { otherLogger } = require("../logger/otherApiLogger");
const uuid = require("uuid")

/**
 * GET request to /books
 */

router.post("/ultra", async (req, res, next) => {
    try {
        req.correlationId = uuid.v4();
        otherLogger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
            correlationId: req.correlationId,
            requestBody: req.body,
        });
        const start = Date.now();
        const apiData = await panController.searchPan(req.body)
        const duration = Date.now() - start;
        otherLogger.info(
            `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
            { correlationId: req.correlationId, requestBody: { "billable": apiData.billable, "txn_id": apiData.txn_id, "status": apiData.status } }
        );
        if (apiData["error"]) {
            res.status(apiData['error']?.status || 500).json(apiData)
            return;
        }
        delete apiData["api_name"];
        delete apiData["api_category"];
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

router.post("/name-dob", async (req, res, next) => {
    const apiData = await panController.panToName(req.body)
    if (apiData["error"]) {
        res.status(apiData['error']['status']).json(apiData)
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data: apiData
    })
});

router.post("/validate", async (req, res, next) => {
    try {
        req.correlationId = uuid.v4();
        otherLogger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
            correlationId: req.correlationId,
            requestBody: req.body,
        });
        const start = Date.now();
        const apiData = await panController.validatePan(req.body)
        const duration = Date.now() - start;
        otherLogger.info(
            `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
            { correlationId: req.correlationId, requestBody: { "billable": apiData.billable, "txn_id": apiData.txn_id, "status": apiData.status } }
        );

        delete apiData["api_name"];
        delete apiData["api_category"];
        if (apiData["error"]) {
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

router.post("/extraction", async (req, res, next) => {
    const apiData = await panController.extractPanOcr(req.body)
    if (apiData["error"]) {
        res.status(apiData['error']['status']).json(apiData)
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data: apiData
    })
});

router.post("/verification-v1", async (req, res, next) => {
    const apiData = await panController.panVerification(req.body)
    if (apiData["error"]) {
        res.status(apiData['error']['statusCode']).json(apiData["error"])
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data: apiData.data
    })
});

module.exports = router;