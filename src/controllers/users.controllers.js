const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const user = {};

user.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}

user.signup = async (req, res) => {

    let { nombre, correo, contrasena } = req.body;
    let user = new userModel({
        nombre,
        correo,
        contrasena: bcrypt.hashSync(contrasena, 10)
    });

    try {
        let userSaved = await user.save();

        if (!userSaved) {
            res.send('usuario no guardado');
        }
        if (userSaved) {
            req.flash('exito', 'El usuario se agrego correctamente');
            res.render('users/signin');
        }

    } catch (error) {
        res.send(error)
    }    
}

user.renderSignInForm = (req, res) => {    
    res.render('users/signin');
}

user.signin = (req, res) => {
    
    res.render('signin');
}

user.logout = (req, res) => {
    res.render('logout');
}



module.exports = user;