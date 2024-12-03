const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

/**
 * GET request to /authors
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'All Authors were fetched'
    });
});

/**
 * GET request to /authors/:id
 */
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Author with id was fetch'
    });
});

/**
 * POST create /author
 */

router.post("/", async (req, res, next) => {
    const rcData = await authorController.createAuthor(req.body)
    res.status(201).json({
        message: "Created successfully",
        data : rcData
    })
});
  

module.exports = router;