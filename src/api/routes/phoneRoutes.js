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
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData.response
    })
});

router.post("/prefill-v2", async (req, res, next) => {
    const apiData = await phoneController.prefillVersion2(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData.response
    })
});

router.post("/gaming/compliance", async (req, res, next) => {
    const apiData = await phoneController.gameCompliance(req.body)
    if(apiData["error"]){
        res.status(apiData['error']['status']).json(apiData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : apiData.response
    })
});


module.exports = router;