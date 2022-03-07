const mongoose = require('mongoose');
require('dotenv/config')

mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;

module.exports = mongoose;
