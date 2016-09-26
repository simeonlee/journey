import React, { Component } from 'react'
import { NavLink } from './NavLink'

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
              <li><NavLink to="/Journal">Journal</NavLink></li>
              <li><a href="#">Dashboard</a></li>
            </ul>
            <div className="navbar-header custom-header">
              <a className="navbar-brand">Journey</a>
            </div>
            <ul className="nav navbar-nav navbar-right second">
              <li><a href="#">Profile</a></li>
              <li><a href="#">Sign In</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}