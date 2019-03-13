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