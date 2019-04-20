const express = require("express"),
    apiRoutes = express.Router(),
    ChatEvent = require("../model/chatEvents"),
    UserModel = require("../model/userEvent");
    Admin = require("../model/admin");
    ChatRoom = require("../model/chatrooms");
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

    apiRoutes.route('/api/chatroom').get((req, res) =>{
        ChatRoom.find((err, chatroom) =>{
            if (err)
                console.log(err);
            else
                res.json(chatroom);
        })
    })

    apiRoutes.route('/api/chatroom/add').post((req, res) =>{
        let chatroom = new ChatRoom(req.body);
        chatroom.save()
            .then(admin => {
                res.status(200).json({'chatroom' : 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record')
            })
    });

    apiRoutes.route('/api/chatroom/:id').post(function(req, res) {
        ChatRoom.findById(req.params.id, function(err, room) {
            if (!room)
                res.status(404).send('data is not found');
            else
                room.name = req.body.name;
                room.edit_date = req.body.edit_date;
                room.status = req.body.status;
                room.date_created = req.body.date_created;
    
                room.save().then(room => {
                    res.json('Room updated');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
    });

    apiRoutes.route('/api/get/chatroom/:id').get(function(req, res) {
        let id = req.params.id;
        ChatRoom.findById(id, function(err, room) {
            res.json(room);
        });
    });

    module.exports = apiRoutes