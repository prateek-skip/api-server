const express = require('express');
const router = express.Router();
const rcController = require('../controllers/RC/RC');


router.post("/", async (req, res, next) => {
    const rcData = await rcController.getRc(req.body)
    if(rcData["error"]){
        res.status(rcData['error']?.status || 500).json(rcData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : rcData
    })
});


module.exports = router;