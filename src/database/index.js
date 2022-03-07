const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://bernardombsouza:analytics1995@hurbapi.hkgq1.mongodb.net/apiPrice?retryWrites=true&w=majority");
mongoose.Promise = global.Promise;

module.exports = mongoose;
