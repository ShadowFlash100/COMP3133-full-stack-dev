const express = require("express"),
    apiRoutes = express.Router(),
    ChatEvent = require("../model/chatEvents"),
    UserModel = require("../model/userEvent");
    require('../app')
    socket = require('../controller/SocketControl')

    apiRoutes.get("/api/history", (req, res)=>{
        UserModel.find((err, docs)=>{
            if(err){
                res.json("socket id not found");
            }
            else{
                //console.log(socket.id)
                res.json(docs)
            }
        })

    });

    apiRoutes.post("/api/roomHistory/:roomName", (req, res)=>{
        UserModel.find({chatroom: req.params.roomName}, (err, docs)=>{
            if(err){
                res.json("could not find roomname")
                console.log("could not find roomname")
            }
            else{
            console.log(docs)
            res.json(docs)
            }
        })

    });

    apiRoutes.get("api/eventlog", (req, res)=>{
        ChatEvent.find((err, docs)=>{
            if (err){
                console.log(err)
                console.log("error finding documents")
            }
            else{
                res.json(docs)
            }
        })
    });

    module.exports = apiRoutes