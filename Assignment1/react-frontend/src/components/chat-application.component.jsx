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
            user:
            client: socket()
         }
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