const modelNotess = require('../models/notes');
var notes = {};

notes.renderNoteForm = (req, res) => {
    res.render('notes/new-note.hbs');
};

notes.createNewNote = (req, res) => {

    const { titulo, descripcion } = req.body;

    let note = new modelNotess({
        titulo,
        descripcion
    });

    note.save((err, noteSaved) => {
        if (err) {
            res.status(400).send({
                status: false,
                err
            })
        }
        req.flash('exito', 'Nota agregada con exito');
        res.redirect('/notes');

    });

};

notes.renderNotes = async (req, res) => {

    let notesFinded = await modelNotess.find();

    if (!notesFinded) {
        res.status(400).send({
            status: false,
            message: 'No se encontraron notas'
        });
    }

    res.render('notes/all-notes.hbs', { notesFinded });

};

notes.renderEditForm = async (req, res) => {

    let { id } = req.params;
    let noteFinded = await modelNotess.findById(id);

    if (noteFinded) {
        res.render('notes/edit-note.hbs', { noteFinded });
    }
};

notes.updateNote = async (req, res) => {

    let { id } = req.params;
    let { titulo, descripcion } = req.body;

    let noteUpdated = await modelNotess.findByIdAndUpdate(id, { titulo, descripcion });

    if (noteUpdated) {
        req.flash('exito', 'Nota editada con exito');
        res.redirect('/notes');
    }
};

notes.deleteNote = async (req, res) => {

    let { id } = req.params;

    let noteDeleted = await modelNotess.findByIdAndRemove(id, { useFindAndModify: false });

    if (!noteDeleted) {
        res.send('no elimino');
    }

    if (noteDeleted) {
        req.flash('exito', 'Nota eliminada con exito');
        res.redirect('/notes');
    }


}

module.exports = notes;