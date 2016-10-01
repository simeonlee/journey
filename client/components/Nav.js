import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import axios from 'axios'

export class Nav extends Component {
  constructor(props) {
    super(props)
    this.logInOrOut = this.logInOrOut.bind(this);
  }

  logout() {
    axios.get('/logout');
  }

  logInOrOut() {
    //check for auth here
    if (true) {
      return (<li><Link activeClassName="nav-active" to="/login">Log In</Link></li>);
    } else {
      // return (<li onClick={this.logout}>Log out</li>)
      // return (<li class="nav-active" onClick={this.logout}>Log Out</li>);
      // return (<li onClick={this.logout}><Link activeClassName="nav-active" to="/">Log Out</Link></li>);
      return (<li onClick={this.logout}><Link activeClassName="nav-active" to="/login">Log Out</Link></li>);
    }
  }

  render() {
    return (
      <nav className="transparent white-background wrap navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="white-background navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="brand-centered">
            <IndexLink to="/" className="navbar-brand"><div className="logo">Journey</div></IndexLink>
          </div>
          <div className="navbar-collapse collapse" id="navigation">
            <ul className="nav navbar-nav navbar-left">
              <li><Link activeClassName="nav-active" to="/journal">Journal</Link></li>
              <li><Link activeClassName="nav-active" to="/dashboard">Dashboard</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link activeClassName="nav-active" to="/profile">Profile</Link></li>
              {this.logInOrOut()}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}