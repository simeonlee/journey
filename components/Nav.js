import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

export class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-format">
              <li className="navbar-links"><Link activeClassName="nav-active" to="/journal">Journal</Link></li>
              <li className="navbar-links"><Link to="/dashboard">Dashboard</Link></li>
            </ul>
            <div className="navbar-header custom-header">
              <IndexLink to="/" className="navbar-brand">Journey</IndexLink>
            </div>
            <ul className="nav navbar-nav navbar-right second navbar-format margin-right">
              <li className="navbar-links"><Link to="/profile">Profile</Link></li>
              <li className="navbar-links"><Link to="/signin">Sign In</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}