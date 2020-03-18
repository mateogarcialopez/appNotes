const express = require('express');
const ctrlNotes = require('../controllers/notes.controllers');
const router = express.Router();

router.get('/notes/add', ctrlNotes.renderNoteForm);
router.post('/notes/addNewNote', ctrlNotes.createNewNote);
router.get('/notes', ctrlNotes.renderNotes);
router.get('/notes/edit/:id', ctrlNotes.renderEditForm);
router.put('/notes/edit/:id', ctrlNotes.updateNote);
router.delete('/notes/delete/:id', ctrlNotes.deleteNote);

module.exports = router;