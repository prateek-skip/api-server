const express = require('express');
const router = express.Router();
const aadharController = require('../controllers/Aadhar/aadharController');

/**
 * GET request to /books
 */

router.post("/mask-aadhar", async (req, res, next) => {
    const apiData = await aadharController.maskAadhar(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData
    })
});

router.post("/verify-aadhar", async (req, res, next) => {
    const apiData = await aadharController.verifyAadhar(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        apiData
    })
});



module.exports = router;