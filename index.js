const express = require('express');
const bodyParser = require('body-parser')

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require('./src/controllers/authController')(app);
require('./src/controllers/coinController')(app);

app.listen(PORT, HOST)