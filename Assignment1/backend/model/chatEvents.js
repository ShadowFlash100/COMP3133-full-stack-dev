const mongoose = require('mongoose')
const Schema = mongoose.Schema

let event = new Schema({
    event: String,
    chatroomName: String,
    user: String,
    timestamp: Date
})
module.exports = mongoose.model("chatEvents", event)
