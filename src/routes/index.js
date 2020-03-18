const express = require('express');
const ctrlNotes = require('../controllers/index.controllers');
const router = express.Router();

router.get('/', ctrlNotes.renderINdex);
router.get('/about', ctrlNotes.renderAbout);

module.exports = router