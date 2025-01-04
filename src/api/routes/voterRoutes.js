const express = require('express');
const router = express.Router();
const voterController = require('../controllers/VoterID/voterController');

/**
 * GET request to /books
 */

router.post("/ocr/extraction", async (req, res, next) => {
    const apiData = await voterController.extractVoterIdOcr(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData
    })
});

router.post("/verification", async (req, res, next) => {
    const apiData = await voterController.voterIdVerification(req.body)
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