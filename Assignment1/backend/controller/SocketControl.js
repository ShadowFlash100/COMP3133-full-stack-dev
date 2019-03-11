const ChatEvent = require("../model/chatEvents"),
    User = require("../model/user");
    require("../routes/api")


module.exports = (io) =>{
var numUsers = 0
    io.on('connection', (socket) => {
        let user = new User({socket_id: socket.id, time_created: Date.now()})
        user.save();
        socket.username = "anonymous"
        socket.room = "general"

        console.log('New user connected') // save to history the a new socket connection is made with timestamp

        //add user
        socket.on('set_username', (data) =>{
            if(data.username != ""){
                socket.username = data.username
                socket.room = 'general'; // default room
                socket.join('general'); // save to history the username and room joined
                socket.emit('update_self', {message: " You have connected to " + socket.room + " as " + socket.username});
                socket.broadcast.to('general').emit('new_message', {message: data.username + " has connected to this chat", username: "SERVER"});
                
                //save event to chatEvents database
                let event = new ChatEvent({event: socket.username +
                    " has joined room: " + socket.room, chatroom: socket.room, user: socket.username, 
                    socket_id: socket.id, timestamp: Date.now()});
                    event.save().then(event =>{
                        console.log(event)
                        console.log('')
                    });
                //update user document and return new updated doc
                User.findOneAndUpdate({socket_id: socket.id}, {username: socket.username}, 
                    {new: true}, (err, res) =>{
                    if (err){
                        console.log('socket_id not found')
                        console.log(err)
                    }
                    else{
                        console.log(res)
                        console.log('')
                    }
                })

            }// if (data.username != "")
        })// Socket.on("set_username")

        //listening for disconnecting users
        socket.on('disconnect', ()=> {


            // save in event log user disconnected with timestamp
            if(socket.room != null){
                let event = new ChatEvent({event: socket.username +
                    " disconnected from room: " + socket.room, chatroom: socket.room, user: socket.username, 
                    socket_id: socket.id, timestamp: Date.now()});
                    
                event.save().then(event =>{
                    console.log(event)
                })

                socket.broadcast.to(socket.room).emit('new_message', {message: socket.username + " has left the room", username: "SERVER"});
                
            }
        })

        //listen on new_message
        socket.on("new_message", (data)=>{
            let event = new ChatEvent({event: socket.username +
                " sent a message to room: " + socket.room, chatroom: socket.room, message: data.message, user: socket.username, 
                socket_id: socket.id, timestamp: Date.now()});
                    
            event.save().then(event =>{
                console.log(event.user + " sent a message: " + event.message)
            })
            //broadcast message to all sockets
            io.sockets.in(socket.room).emit('new_message', {message: data.message, username: socket.username});
        })

        //listen to typing
        socket.on("typing", (data) =>{
            socket.broadcast.emit("typing", {
                username: socket.username
            })
        })

        //changing rooms
        socket.on("change_room", (room) => {
            if(room != socket.room){
                let event = new ChatEvent({event: socket.username +
                    " switched to room: " + room + "\n from: " + socket.room, chatroom: socket.room, user: socket.username, 
                    socket_id: socket.id, timestamp: Date.now()});
                        
                event.save().then(event =>{
                    console.log(event.event)
                })
                //console.log("Reached")
                socket.leave(socket.room);
                socket.broadcast.to(socket.room).emit('new_message', {message: socket.username + " has left the room", username: "SERVER"});
                socket.room = room;
                socket.join(room); // save to history the username and room joined
                socket.broadcast.to(room).emit('new_message', {message: socket.username + " has connected to this room", username: "SERVER"});
                socket.emit("clean");
                socket.emit('update_self', {message: " You have connected to " + socket.room + " as " + socket.username});
                //socket.emit('update_userlist', users);

            }
        })
        module.exports = socket
    })
    //module.exports = socket
}