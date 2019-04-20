import React, {Component} from 'react';
import socket from '../socketClient'
import {Container, Modal, ListGroup, Input, FormGroup, Form, Button} from 'reactstrap'


// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Login from './login.component';

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            chatHistory: [],
            input: '',
            current_room: '',
            user: '',
            client: socket()
         }
    

    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.onMessageReceived = this.onMessageReceived.bind(this)
    this.updateChatHistory = this.updateChatHistory.bind(this)
    this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
    }

    componentDidMount() {
        this.props.registerHandler(this.onMessageReceived)
        this.scrollChatToBottom()
    }

    componentDidUpdate() {
        this.scrollChatToBottom()
    }

    componentWillUnmount() {
        this.props.unregisterHandler()
    }

    onInput(e) {
        this.setState({
            input: e.target.value
    })
    }

    onSendMessage() {
        if (!this.state.input)
            return

        this.props.onSendMessage(this.state.input, (err) => {
        if (err)
            return console.error(err)

        return this.setState({ input: '' })
    })
    }

    onMessageReceived(entry) {
    console.log('onMessageReceived:', entry)
    this.updateChatHistory(entry)
    }

    updateChatHistory(entry) {
    this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
    }

    scrollChatToBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight)
    }

    render() { 
        return (
            <div className = "App">
                <div>
                    <h1>Chat Now</h1>
                </div>
                <div id="chatroom">
                    <form onSubmit = {this.handleMessage}>
                        <Button>
                            Send
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default ChatApp;