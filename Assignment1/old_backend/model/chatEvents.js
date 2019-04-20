const mongoose = require('mongoose')
const Schema = mongoose.Schema

let event = new Schema({
    type: String, //CONNECTION, DISCONNECTION, MESSAGE, JOIN, LEAVE
    event: String,
    //chatroom: String,
    //message: String, //
    user: String,
    socket_id: String,
    timestamp: Date
})
module.exports = mongoose.model("chatEvents", event)
