const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    socket_id: String,
    username: String,
    password: String,
    time_created: Date
})
module.exports = mongoose.model('users', user)
