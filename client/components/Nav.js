import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

export class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="transparent haze wrap navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navigation">
            <ul className="nav navbar-nav navbar-format">
              <li className="navbar-links"><Link activeClassName="nav-active" to="/journal">Journal</Link></li>
              <li className="navbar-links"><Link activeClassName="nav-active" to="/dashboard">Dashboard</Link></li>
            </ul>
            <div className="navbar-header custom-header">
              <IndexLink to="/" className="navbar-brand">Journey</IndexLink>
            </div>
            <ul className="nav navbar-nav navbar-right second navbar-format">
              <li className="navbar-links"><Link activeClassName="nav-active" to="/profile">Profile</Link></li>
              <li className="navbar-links"><Link activeClassName="nav-active" to="/signin">Log In</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}