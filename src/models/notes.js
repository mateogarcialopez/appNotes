const mongoose = require('mongoose');
const schema = mongoose.Schema;


let schemaNotes = new schema({

    titulo: { type: String, required: [true, 'EL titulo es requerido'] },
    descripcion: { type: String, required: [true, 'La descripcion es requerida'] }

}, { timestamps: true });

module.exports = mongoose.model('note', schemaNotes);