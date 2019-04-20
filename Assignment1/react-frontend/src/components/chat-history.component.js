import React, {Component} from 'react';
import axios from 'axios';
import Moment from 'moment';

const History = props => (
    <tr>
        <td>{props.history.id}</td>
        <td>{Moment(props.history.timestamp).format('MMM Do YYYY')}</td>
        <td>{Moment(props.history.timestamp).format('h:mm:ss a')}</td>
        <td>{props.history.username}</td>
        {/* <td>{props.history.reciever}</td> */}
        <td>{props.history.message}</td>
        <td>{props.history.chatroom}</td>
    </tr>
)

export default class ChatHistory extends Component {

    _isMounted = false

    constructor(props){
        super(props);
        this.state = { history: [] };
    }

    componentDidMount() {
        this._isMounted = true;

        if(localStorage.getItem("username") !== "admin"){
            this.props.history.push('/login');
        }

        axios.get('http://localhost:4000/api/history')
            .then(response => {
                if(this._isMounted){
                    this.setState({history: response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {

        if(localStorage.getItem("username") !== "admin"){
            this.props.history.push('/login');
        }

        axios.get('http://localhost:4000/api/history')
        .then(response => {
            if(this._isMounted){
                this.setState({history: response.data});
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    historyList() {
        return this.state.history.map(function(currentHistory, i) {
            return <History history={currentHistory} key={i} />;
        });
    }

    logout(){
        localStorage.setItem("username", "");


    }

    render() {

        return(

            <div>
                <h3>Chat History</h3>
                <button onClick={this.logout}>Logout</button>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Sender</th>
                            {/* <th>Reciever</th> */}
                            <th>Message</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.historyList() }
                    </tbody>
                </table>
            </div>
        )
    }
}