import React, {Component} from 'react';
import socket from '../socketClient'
import DisplayChatBox from './containers/displayChatbox'
import axios from 'axios'
//import scroll from 'react'

// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Login from './login.component';

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            chatHistory: [],
            input: '',
            current_room: '',
            user: 'guest',
            client: socket()
         }
    

    this.onInput = this.onInput.bind(this)
    this.onNewMessage = this.onNewMessage.bind(this)
    this.onMessageReceived = this.onMessageReceived.bind(this)
    this.updateChatHistory = this.updateChatHistory.bind(this)
    this.getChatHistory = this.getChatHistory.bind(this)
    this.onJoinChatroom = this.onJoinChatroom.bind(this)
    this.onLeaveChatroom = this.onLeaveChatroom.bind(this)
    //this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
    }

    componentDidMount() {
        //this.scrollChatToBottom()
        this.getChatHistory()
    }

    componentDidUpdate() {
        //this.scrollChatToBottom()
        this.getChatHistory()
    }

    componentWillUnmount() {
        //this.props.unregisterHandler()
        this.onLeaveChatroom()
    }

    onJoinChatroom(){
        return this.state.client.join(this.state.current_room, () =>{
            console.log(`${this.state.user} has joined ${this.state.current_room} Chatroom`)
        })
    }

    onLeaveChatroom(){
        this.state.client.leave(this.state.current_room, () =>{
            console.log(`${this.state.user} has left ${this.state.current_room} chatroom `)
        })
    }

    onTyping(){
        let room = this.state.current_room
        return this.state.client.typing(room, () =>{
            console.log(`${this.state.user} is typing` )
        })
    }

    onInput(e) {
        this.setState({
            input: e.target.value
    })
    }

    onNewMessage = event => {
        event.preventDefault()
        let room = this.state.current_room
        let msg = this.state.input
        let user = localStorage.getItem('username')
        this.setState({ input: '' })
        if (!this.state.input)
            return

        this.state.client.message(room, msg, user, (err) => {
        if (err)
            return console.error(err)

        return this.setState({ input: '' })
    })
    }

    onMessageReceived(entry) {
    console.log('onMessageReceived:', entry)
    this.updateChatHistory(entry)
    }

    getChatHistory(){
        const {chatName} = this.props.match.params
        axios.get(`http://localhost:4000/api/roomHistory/${chatName}`)
            .then(res => {
                this.setState({
                    current_room: res.data.chatroom,
                    chatHistory: res.data.messsage

                })
            })
    }

    updateChatHistory(entry) {
        this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
    }
/*
    scrollChatToBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight)
    }
    */
    render() { 
        return (
            <div className = "App">
                <div>
                    <h1>Chat Now</h1>
                </div>
                <div id="chatroom">
                    <form onSubmit = {this.handleMessage}>
                        
                    </form>
                </div>
            </div>
        );
    }
}
 
export default ChatApp;