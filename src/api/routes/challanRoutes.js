const express = require('express');
const router = express.Router();
const challanController = require('../controllers/Challan/challan');

/**
 * GET request to /books
 */

router.post("/search", async (req, res, next) => {
    const challanData = await challanController.searchChallan(req.body)
    const data = challanData.result;

    if(challanData["error"]){
        res.status(challanData['error']['status']).json(challanData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data
    })
});

router.post("/search/mhChallan", async (req, res, next) => {
    const mhData = await challanController.getMhChallan(req.body)
    const data = mhData.result;
    if(mhData["error"]){
        res.status(mhData['error']['status']).json(mhData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data
    })
});


module.exports = router;