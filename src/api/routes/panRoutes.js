const express = require('express');
const router = express.Router();
const panController = require('../controllers/PAN/pan');

/**
 * GET request to /books
 */

router.post("/search", async (req, res, next) => {
    const apiData = await panController.searchPan(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData
    })
});

router.post("/name-dob", async (req, res, next) => {
    const apiData = await panController.panToName(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData
    })
});

router.post("/validate", async (req, res, next) => {
    const apiData = await panController.validatePan(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData
    })
});

router.post("/extraction", async (req, res, next) => {
    const apiData = await panController.extractPanOcr(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData
    })
});

router.post("/verification-v1", async (req, res, next) => {
    const apiData = await panController.panVerification(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['statusCode']).json(apiData["error"])    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData.data
    })
});

module.exports = router;