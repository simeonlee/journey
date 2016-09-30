import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

export class Nav extends Component {
  constructor(props) {
    super(props)
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
            <IndexLink to="/" className="navbar-brand">Journey</IndexLink>
          </div>
          <div className="navbar-collapse collapse" id="navigation">
            <ul className="nav navbar-nav navbar-left">
              <li><Link activeClassName="nav-active" to="/journal">Journal</Link></li>
              <li><Link activeClassName="nav-active" to="/dashboard">Dashboard</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link activeClassName="nav-active" to="/profile">Profile</Link></li>
              <li><Link activeClassName="nav-active" to="/login">Log In</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}