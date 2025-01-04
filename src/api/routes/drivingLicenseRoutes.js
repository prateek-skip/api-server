const express = require('express');
const router = express.Router();
const drivingLicenseController = require('../controllers/DrivingLicense/drivingLicenseController');

/**
 * GET request to /books
 */

router.post("/extraction", async (req, res, next) => {
    const apiData = await drivingLicenseController.ocrExtraction(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData
    })
});

router.post("/verify", async (req, res, next) => {
    const apiData = await drivingLicenseController.verifyDL(req.body)
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