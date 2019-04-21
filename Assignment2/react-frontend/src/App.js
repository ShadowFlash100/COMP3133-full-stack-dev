import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import ChatHistory from './components/chat-history.component';
import EventHistory from './components/event-history.component';
import Rooms from './components/rooms.component';
import Login from './components/login.component';
import EditRoom from './components/edit-room.component';
import ChatApp from './components/chat-application.component.jsx';

// import logo from './logo.svg';

class App extends Component {
  logged;

  componentWillMount() {
    if(localStorage.getItem("username") === "admin"){
      this.logged = true;
      console.log(this.logged);
    }
  }

  componentDidUpdate() {
    if(localStorage.getItem("username") === "admin"){
      this.logged = true;
      console.log(this.logged);
    }
  }

  logout(){
    localStorage.setItem("username", "");
    window.location.reload();
}

  render() {
      return ( this.logged ?
        <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a className="navbar-brand">
              <img src={logo} width="30" height="30" alt="Logo Alt" />
            </a> */}
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/eventhistory" className="nav-link">Event History</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/chathistory" className="nav-link">Chat History</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/rooms" className="nav-link">Rooms</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/chat-app" className="nav-link">Chat App</Link>
                </li>
                {/* <li className="navbar-item" style={{float: 'right'}}>
                  <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                </li> */}
              </ul>
            </div>
          </nav>

          <Link to="/login" className="nav-link" className="btn btn-primary" style={{float:'right'}}  onClick={this.logout}>Logout</Link>

          <Route path="/" exact component= {ChatApp} />
          <Route path="/eventhistory" exact component={ EventHistory } />
          <Route path="/chathistory" component={ ChatHistory } />
          <Route path="/rooms" component={ Rooms } />
          <Route path="/login" component={ Login} />
          <Route path="/edit/:id" component={ EditRoom } />
          <Route path="/chat-app" component={ ChatApp } />
        </div>
      </Router>
     :       <Router>
     <div className="container">
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <div className="collapse navbar-collapse">
           <ul className="navbar-nav mr-auto">
             <li className="navbar-item">
               <Link to="/chat-app" className="nav-link">Chat App</Link>
             </li>
             <li className="navbar-item">
               <Link to="/login" className="nav-link">Login</Link>
             </li>
           </ul>
         </div>
       </nav>

       <Link to="/login" className="nav-link" className="btn btn-primary" style={{float:'right'}}>Admin Login</Link>

       <Route path="/" exact component= {ChatApp} />
       <Route path="/eventhistory" exact component={ EventHistory } />
       <Route path="/chathistory" component={ ChatHistory } />
       <Route path="/rooms" component={ Rooms } />
       <Route path="/login" component={ Login} />
       <Route path="/edit/:id" component={ EditRoom } />
       <Route path="/chat-app" component={ ChatApp } />
     </div>
   </Router>
        )
}
}

export default App;
