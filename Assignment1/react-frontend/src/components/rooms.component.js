import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import axios from 'axios';

const Room = props => (
    <tr>
        <td></td>
        <td>{props.rooms.name}</td>
        <td>{Moment(props.rooms.date_created).format('MMM Do YYYY hh:mm A')}</td>
        <td>{Moment(props.rooms.edit_date).format('MMM Do YYYY hh:mm A')}</td>
        <td>
            {props.rooms.status}
        </td>
        <td>
            {<Link to={"/edit/"+props.rooms._id}>Edit</Link>}
        </td>
    </tr>
)

export default class Rooms extends Component {
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = { rooms: [] };
    }

    componentDidMount() {


        this._isMounted = true;

        if(localStorage.getItem("username") !== "admin"){
            this.props.history.push('/login');
        }

        if(this._isMounted){
            axios.get('http://localhost:4000/api/chatroom')
                .then(response => {
                    this.setState({rooms: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    componentDidUpdate() {
        if(this._isMounted){
            axios.get('http://localhost:4000/api/chatroom')
                .then(response => {
                    this.setState({rooms: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }


    roomList() {
        return this.state.rooms.map(function(currentRoom, i) {
            return <Room rooms={currentRoom} key={i} />;
        });
    }

    render() {
        return(
            <div>
                <h3>Rooms</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Room</th>
                            <th>Created Date</th>
                            <th>Edit Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.roomList() }
                    </tbody>
                </table>
            </div>
        )
    }
}