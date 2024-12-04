const express = require('express');
const router = express.Router();
const challanController = require('../controllers/challan');

/**
 * GET request to /books
 */

router.post("/search", async (req, res, next) => {
    const challanData = await challanController.searchChallan(req.body)
    if(challanData["error"]){
        res.status(challanData['error']['status']).json(challanData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : challanData
    })
});

router.post("/search/mhChallan", async (req, res, next) => {
    const mhData = await challanController.getMhChallan(req.body)
    if(mhData["error"]){
        res.status(mhData['error']['status']).json(mhData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : mhData
    })
});


module.exports = router;