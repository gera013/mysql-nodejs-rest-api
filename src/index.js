'use strict'

const express = require('express');
const app = express();

/********************
 * Setings
********************/
app.set('port', process.env.PORT || 3000);

/*************************
 *middlewares
*************************/

//si resivimos un json lo convierte por nosotros 
app.use(express.json());

/*************************
 *Routes
*************************/
const routeEmployees = require('./routes/employees');

app.use(routeEmployees);

/*************************
 *Starting the server 
*************************/
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});