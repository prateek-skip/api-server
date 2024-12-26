const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/Phone/phoneKyc');

/**
 * GET request to /books
 */

router.post("/prefill", async (req, res, next) => {
    const apiData = await phoneController.prefill(req.body)
    console.log(apiData)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(challanData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData
    })
});

router.post("/prefill-v2", async (req, res, next) => {
    const apiData = await phoneController.panToName(req.body)
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
    const apiData = await phoneController.validatePan(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData
    })
});


module.exports = router;