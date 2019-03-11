const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    socket_id: String,
    username: String,
    message: String,
    time_created: Date
})
module.exports = mongoose.model('users', user)
