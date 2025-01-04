const express = require('express');
const router = express.Router();
const passportController = require('../controllers/Passport/passportController');

/**
 * GET request to /books
 */

router.post("/extraction", async (req, res, next) => {
    const apiData = await passportController.ocrExtraction(req.body)
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

router.post("/verify", async (req, res, next) => {
    const apiData = await passportController.verifyPassport(req.body)
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