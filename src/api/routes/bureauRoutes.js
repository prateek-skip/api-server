const express = require('express');
const router = express.Router();
const bureauController = require('../controllers/Bureau/Bureau');

/**
 * GET request to /books
 */

router.post("/equifax-report", async (req, res, next) => {
    const apiData = await bureauController.equifaxBureau(req.body)
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

router.post("/experian-report", async (req, res, next) => {
    const apiData = await bureauController.experianBureau(req.body)
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