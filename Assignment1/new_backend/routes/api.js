const express = require("express"),
    apiRoutes = express.Router(),
    ChatEvent = require("../model/chatEvents"),
    UserModel = require("../model/userEvent");
    Admin = require("../model/admin");
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

    apiRoutes.get("/api/eventlog", (req, res)=>{
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

    apiRoutes.route('/api/admin').get((req, res) =>{
        Admin.find((err, admin) =>{
            if (err)
                console.log(err);
            else
                res.json(admin);
        })
    })

    apiRoutes.route('/api/admin/add').post((req, res) =>{
        let admin = new Admin(req.body);
        admin.save()
            .then(admin => {
                res.status(200).json({'admin' : 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record')
            })
    });

    module.exports = apiRoutes