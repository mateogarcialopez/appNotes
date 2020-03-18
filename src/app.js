const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
require('./config/config');
const app = express();


//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//variables globales, para los mensajes
app.use((req, res, next) => {    
    res.locals.exito =  req.flash('exito');
    next();
});

//views
app.set('views', path.join(__dirname, 'views'));

//handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main', //plantilla por defecto
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs' //definimos la extension de los handlebars
}));

app.set('view engine', '.hbs'); //establecemos el motor que se va a utilizar


//routes
app.use(require('./routes/index.js'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));



//statics files
app.use(express.static(path.join(__dirname, 'public')));

//base de datos
mongoose.connect(process.env.DBURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('Conexion establecida'))
    .catch(err => console.log(err));

//servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});