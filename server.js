'use strict';

const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');

const app        = express();
const PORT       = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

require('./app/models/db');
require('./app/routes/index')(app);

app.listen(PORT, () => console.log('Server Up And Running On Port %s', PORT));