const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    socket_id: String,
    username: String,
    chatroom: String,
    message: String,
    timestamp: Date
})
module.exports = mongoose.model('users', user)