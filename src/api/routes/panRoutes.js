const express = require('express');
const router = express.Router();
const panController = require('../controllers/PAN/pan');

/**
 * GET request to /books
 */

router.post("/search", async (req, res, next) => {
    const apiData = await panController.searchPan(req.body)
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


module.exports = router;