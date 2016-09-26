import React, { Component } from 'react'
import { Link } from 'react-router'

export class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/journal">Journal</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
            <div className="navbar-header custom-header">
              <a className="navbar-brand">Journey</a>
            </div>
            <ul className="nav navbar-nav navbar-right second">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}