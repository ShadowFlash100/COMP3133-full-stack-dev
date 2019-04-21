import React, {Component} from 'react';
import axios from 'axios';

export default class EditRoom extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            status: ''
        }
    }

    componentDidMount() {
        this._isMounted = true;

        if(localStorage.getItem("username") !== "admin"){
            this.props.history.push('/login');
        }

        axios.get('http://localhost:4000/api/get/chatroom/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    status: response.data.status,
                    date_created: response.data.date_created,
                    edit_date: response.data.edit_date
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeStatus(e){
        this.setState({
            status: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        
        const obj = {
            todo_description: this.state.todo_description,
            name: this.state.name,
            status: this.state.status,
            date_created: this.state.date_created,
            edit_date: Date.now()
        };

        axios.post('http://localhost:4000/api/chatroom/'+this.props.match.params.id, obj)
        
        this.props.history.push('/rooms');
    }

    render() {
        return(
            <div>
                <h3>Update Room</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Room Name: </label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <br></br>
                        <select value={this.state.status} onChange={this.onChangeStatus}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update Room" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}