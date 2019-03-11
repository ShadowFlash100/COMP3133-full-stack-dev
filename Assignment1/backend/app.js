const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require("cors"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    apiRoutes = require("./routes/api");

    //set the template engine ejs   
    app.set('view engine', 'ejs')
    app.use(express.static( 'public'))


    //Connect to mlabs database
    mongoose.connect('mongodb://admin:RH20admin@ds159263.mlab.com:59263/chat-app')
        .then(() => {
            console.log("Connected to Mongo database!")
        }).catch(err =>{
            console.log("Error occured. Connection to database failed")
        });

    mongoose.Promise = global.Promise;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.use(cors())

    //routes
    app.use('/', apiRoutes)
    app.get('/', (req, res) => {
        res.render("index")
    })

    server = app.listen(port, function(){
        console.log(`Express server listening on port: ${port}` )
    })

    //socket.io instantiation
    const io = require("socket.io")(server);
    require("./controller/SocketControl")(io)
    module.exports = io

    //listen on every connection
//     io.on('connection', (socket) => {
//         console.log('New user connected') // save to history the a new socket connection is made with timestamp
    
//     //add user
//     socket.on('set_username', (data) =>{
//         if(data.username != ""){
//             socket.username = data.username
//             socket.room = 'general'; // default room
//             socket.join('general'); // save to history the username and room joined
//             socket.emit('update_self', {message: " You have connected to " + socket.room + " as " + socket.username});
//             socket.broadcast.to('general').emit('new_message', {message: data.username + " has connected to this chat", username: "SERVER"});
//         }
//     })

//     //listening for disconnecting users
//     socket.on('disconnect', ()=> {
//         // save in event log user disconnected with timestamp
//         if(socket.room != null){
//             socket.broadcast.to(socket.room).emit('new_message', {message: socket.username + " has left the room", username: "SERVER"});
//         }
//     })

//     //listen on new_message
//     socket.on("new_message", (data)=>{
//         //broadcast message to all sockets
//         io.sockets.in(socket.room).emit('new_message', {message: data.message, username: socket.username});
//     })

//     //listen to typing
//     socket.on("typing", (data) =>{
//         socket.broadcast.emit("typing", {
//             username: socket.username
//         })
//     })

//     //changing rooms
//     socket.on("change_room", (room) => {
//         if(room != socket.room){
//             console.log("Reached")
//             socket.leave(socket.room);
//             socket.broadcast.to(socket.room).emit('new_message', {message: socket.username + " has left the room", username: "SERVER"});
//             socket.room = room;
//             socket.join(room); // save to history the username and room joined
//             socket.broadcast.to(room).emit('new_message', {message: socket.username + " has connected to this room", username: "SERVER"});
//             socket.emit("clean");
//             socket.emit('update_self', {message: " You have connected to " + socket.room + " as " + socket.username});
//             //socket.emit('update_userlist', users);
//         }
//     })
// });