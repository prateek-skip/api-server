const express = require('express');
const router = express.Router();
const rcController = require('../controllers/RC/RC');

/**
 * GET request to /authors
 */
// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'All Authors were fetched'
//     });
// });

// /**
//  * GET request to /authors/:id
//  */
// router.get('/:id', (req, res, next) => {
//     res.status(200).json({
//         message: 'Author with id was fetch'
//     });
// });

/**
 * POST create /author
 */

router.post("/", async (req, res, next) => {
    const rcData = await rcController.getRc(req.body)
    if(rcData["error"]){
        res.status(rcData['error']['status']).json(rcData)    
        return;
    }
    res.status(200).json({
        message: "Request successfull.",
        data : rcData
    })
});


module.exports = router;