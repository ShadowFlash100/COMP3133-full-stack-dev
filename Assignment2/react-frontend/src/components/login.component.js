import React, {Component} from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import ChatHistory from './chat-history.component';

const Section = (props) => {
    return <section><h2>Wrong username or password!</h2></section>
  }

export default class Login extends Component {


    

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        var user = this.state.username;
        var password = this.state.password;
        localStorage.setItem("username", user)

        axios.get('http://localhost:4000/api/admin')
            .then(response => {
                for(var i = 0; i < response.data.length; i++){
                    var element = response.data[i];
                    if(element.username === user) {
                        if(element.password === password){
                            localStorage.setItem('username', "admin");
                            this.props.history.push('/');
                            window.location.reload();
                        }
                    }
                }
                this.setState({
                    error: true
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Admin Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                    { this.state.error ? <Section/> : null }
                </form>
            </div>
        )
    }
}