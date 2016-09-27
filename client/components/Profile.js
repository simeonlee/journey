import React, { Component } from 'react'

export class Profile extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="col-md-offset-2 col-md-8">
        <h2>
          Profile
        </h2>
        <div>
          <ul className="ul-profile col-md-3">
            <li className="profile-list"><a href="settings" className="activeClassName">Settings</a></li>
            <li className="profile-list"><a href="personal-info" className="activeClassName">Personal Info</a></li>
            <li className="profile-list"><a href="" className="activeClassName">Whatever</a></li>
            <li className="profile-list"><a href="" className="activeClassName">We</a></li>
            <li className="profile-list"><a href="" className="activeClassName">Need</a></li>
            <li className="profile-list"><a href="" className="activeClassName">Yo</a></li>
          </ul>
        </div>
        <div className="col-md-9">
          yoyo
        </div>
      </div>
    )
  }
}