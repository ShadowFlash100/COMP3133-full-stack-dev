$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message"),
        username = $("#username"),
        send_message = $("#send_message"),
        set_username = $("#set_username"),
        chatroom = $("#chatroom");
        feedback = $("#feedback")

    send_message.click(function(){
        socket.emit("new_message", {message: message.val()})
    })

    //listen on new message 
    socket.on("new_message", (data)=>{
        console.log(data)
        chatroom.append("<p class= 'message'>" + data.username + ": " + data.message + "</p>")
    })

    set_username.click(function (){
        console.log(username.val())
        socket.emit("set_username", {username: username.val()})
    })
    //Emit Typing
    message.bind("keypress", () =>{
        socket.emit("typing")
    })
    socket.on("typing", (data) =>{
        feedback.html("<p> <i>" + data.username + "is typing a message..." + " </i></p>")
    })
});