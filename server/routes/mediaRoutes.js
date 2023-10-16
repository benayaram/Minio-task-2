const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

// Route for uploading media
router.post('/upload', mediaController.uploadMedia);

// Route for retrieving media and its metadata
router.get('/media/:mediaId', mediaController.getMedia);

module.exports = router;