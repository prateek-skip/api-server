const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/Phone/phoneKyc');
const { otherLogger } = require("../logger/otherApiLogger");
const uuid = require("uuid")

/**
 * GET request to /books
 */

router.post("/prefill", async (req, res, next) => {
    const apiData = await phoneController.prefill(req.body)
    // console.log(apiData)
    if (apiData["error"]) {
        res.status(apiData['error']['status']).json(apiData)
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data: apiData.response
    })
});

router.post("/prefill-v2", async (req, res, next) => {
    try {
        req.correlationId = uuid.v4();
        otherLogger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
            correlationId: req.correlationId,
            requestBody: req.body,
        });
        const start = Date.now();

        const apiData = await phoneController.prefillVersion2(req.body)

        const duration = Date.now() - start;
        otherLogger.info(
            `Outgoing response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
            { correlationId: req.correlationId, requestBody: { "billable": apiData.billable, "txn_id": apiData.txn_id, "status": apiData.status } }
        );

        delete apiData["api_name"];
        delete apiData["api_category"];

        if (apiData["error"]) {
            otherLogger.error(
            `Error response: ${req.method} ${req.originalUrl} ${apiData['error']?.statusCode || 500}`,
            { correlationId: req.correlationId, requestBody: apiData['error']?.message }
        );
            res.status(apiData['error']?.statusCode || 500).json(apiData)
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

router.post("/gaming/compliance", async (req, res, next) => {
    const apiData = await phoneController.gameCompliance(req.body)
    if (apiData["error"]) {
        res.status(apiData['error']['status']).json(apiData)
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data: apiData.response
    })
});


module.exports = router;