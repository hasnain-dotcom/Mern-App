var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newSchema =  new Schema({
    firstName: String,
    lastName: String,
    Email: String,
    Password: String,
    // other fields...
});

var userSchema = mongoose.model('userSchema', newSchema);
module.exports = userSchema;
