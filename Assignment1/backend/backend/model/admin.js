const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    username:{
        type: String
    },
    password:{
        type: String
    }
});


const Admin = module.exports = mongoose.model('Admin', Schema);