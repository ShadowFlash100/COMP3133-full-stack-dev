import React, {Component} from 'react';
import Moment from 'moment'
import axios from 'axios';

const Event = props => (
    <tr>
        <td>{props.event.type}</td>
        <td>{Moment(props.event.timestamp).format('MMM Do YY')}</td>
        <td>{Moment(props.event.timestamp).format('h:mm:ss a')}</td>
        <td>{props.event.user}</td>
        <td></td>
        <td></td>
    </tr>
)

export default class EventHistory extends Component {
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = { event: [] };
    }

    componentDidMount() {
        this._isMounted = true;

        axios.get('http://localhost:4000/api/eventlog')
            .then(response => {
                if(this._isMounted){
                    this.setState({event: response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/api/eventlog')
        .then(response => {
            if(this._isMounted){
                this.setState({event: response.data});
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    componentWillUnmount() {
        this._isMounted = false;
      }

    eventList() {
        return this.state.event.map(function(currentEvent, i) {
            return <Event event={currentEvent} key={i} />;
        });
    }

    render() {
        return(
            <div>
                <h3>Event History</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>User</th>
                            <th>EventID</th>
                            <th>PPID</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.eventList() }
                    </tbody>
                </table>
            </div>
        )
    }
}