const express = require('express');
const cors = require('cors');
const app = express();
/*
    ****************
    ****SETTINGS****
    ****************
*/
//Definición del puerto
app.set('port', process.env.PORT || 4000);



/*
    *****************
    ***MIDDLEWARES***
    *****************
*/
//Permite que 2 servidores puedan intercambiar datos entre ellos
app.use(cors());
app.use(express.json());



/*  ******************
    ******ROUTES******
    ******************
*/
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));

module.exports = app;