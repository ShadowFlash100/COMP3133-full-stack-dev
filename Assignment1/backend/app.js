const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require("cors"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    apiRoutes = require("./routes/api");

    //set the template engine ejs   
    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    app.use(bodyParser.json())
    app.use(cors())

    //Connect to mlabs database
    mongoose.connect('mongodb://admin:RH20admin@ds159263.mlab.com:59263/chat-app')
        .then(() => {
            console.log("Connected to Mongo database!")
        }).catch(err =>{
            console.log("Error occured. Connection to database failed")
        });

        mongoose.Promise = global.Promise;
    //routes
    app.get('/', (req, res) => {
        res.render("index")
    })
    //app.use(apiRoutes)
    server = app.listen(port, function(){
        console.log(`Express server listening on port: ${port}` )
    })

    //socket.io instantiation
    const io = require("socket.io")(server)

    //listen on every connection
    io.on('connection', (socket) => {
        console.log('New user connected')
    
        socket.on('set_username',(data) =>{
            socket.username = data.username
            
        })
        //listen on new_message
        socket.on("new_message", (data)=>{
            //broadcast message to all sockets
            io.sockets.emit('new_message', {message: data.message, username: socket.username});
        })
        //listen to typing
        socket.on("typing", (data) =>{
            socket.broadcast.emit("typing", {
                username: socket.username
            })
        })
    });