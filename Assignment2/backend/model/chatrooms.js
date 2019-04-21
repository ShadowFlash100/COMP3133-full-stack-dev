const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let rooms = new Schema({
    name: String,
    edit_date: Date,
    date_created: Date,
    status: ["Active", "Inactive"]
})
module.exports = mongoose.model('chatrooms', rooms)