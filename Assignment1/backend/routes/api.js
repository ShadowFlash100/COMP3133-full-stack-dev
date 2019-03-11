const express = require("express"),
    apiRoutes = express.Router(),
    ChatEvent = require("../model/chatEvents"),
    UserModel = require("../model/user");
    require('../app')
    socket = require('../controller/SocketControl')

    apiRoutes.get("/api/history", (req, res)=>{
        ChatEvent.find((err, docs)=>{
            if(err){
                res.json("socket id not found");
            }
            else{
                //console.log(socket.id)
                console.log(docs._message)
            }
        })

    });

    apiRoutes.post("/api/roomHistory/:roomName", (req, res)=>{
        ChatEvent.find(req.params.roomName, (err, docs)=>{
            console.log(docs)
            res.json(docs)
        })

    });

    apiRoutes.get("api/eventlog", (req, res)=>{
        
    });

    module.exports = apiRoutes