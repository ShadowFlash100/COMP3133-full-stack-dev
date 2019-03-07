const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    username: String,
    created: Date
})
module.exports = mongoose.model('users', user)