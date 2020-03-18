const mongoose = require('mongoose');
const schema = mongoose.Schema;

let schemaUser = new schema({

    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    correo: { type: String, unique: true, require: [true, 'El email es necesario'] },
    contrasena: { type: String, required: [true, 'La contraseña es requerida'] },

}, { timestamps: true });

schemaUser.methods.toJSON = function () {

    let user = this;
    let userObjetct = user.toObject();
    delete userObjetct.password;

    return userObjetct;
}


module.exports = mongoose.model('user', schemaUser);