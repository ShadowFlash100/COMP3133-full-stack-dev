
var numUsers = 0

$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message"),
        username = $("#username"),
        send_message = $("#send_message"),
        set_username = $("#set_username"),
        general = $("#general"),
        offtopic = $("#off_topic"),
        support = $("#support"),
        chatroom = $("#chatroom");
        feedback = $("#feedback");
        userlist = $("#userlist");
        $window = $(window);

    
    //Changes current room
    general.click(() => {
        socket.emit("change_room", "general")
    })

    offtopic.click(() => {
        socket.emit("change_room", "off topic")
    })

    support.click(() => {
        socket.emit("change_room", "support")
    })

    //Sends message keyboard events
    // $window.keydown(event => {
    //     // When the client hits ENTER on their keyboard
    //     if (message.val().length != 0) {
    //         if (event.which === 13) {
    //             send_message.click()
    //     //         socket.emit("new_message", {message: message.val()});
    //     //         message.val('');
    //         }
    //      }
    // })


    send_message.click(function(){
        if(message.val().length != 0){
            socket.emit("new_message", {message: message.val()});
            // save message in chatEvents)
            message.val('');
        }
    })

    //Sets username and logs into 
    set_username.click(function (){
        socket.emit("set_username", {username: username.val()});
        username.val('');
    })

    //listening for connection and discoonection
    socket.on('connect', () => {
        console.log('Connected to server');
    })
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    })

    //listen on new message 
    socket.on("new_message", (data)=>{
        feedback.html("")
        chatroom.append("<p class= 'message'>" + data.username + ": " + data.message + "</p>")
    })

    //listen for disconnecting users
    socket.on("user_disconnected", (data)=>{
        chatroom.append("<p class= 'message'><b>SERVER:</b> " + data.username + " has disconnected</p>")
    })

    //Emit Typing
    message.bind("keypress", () =>{
        socket.emit("typing")
    })
    socket.on("typing", (data) =>{
        feedback.html("<p> <i>" + data.username + " is typing a message..." + " </i></p>")
    })

    //Update own chat
    socket.on("update_self", (data) => {
        chatroom.append("<p class= 'message'><b>SERVER:</b> " + data.message +"</p>")
    })

    //Clears chat
    socket.on("clean", () => {
        chatroom.html("");
        userlist.html("");
    })
});