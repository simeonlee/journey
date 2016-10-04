import React, { Component } from 'react'

export class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'wakaflackaflame',
      password: 'yumyum',
      email: 'fakemail@sofake.com',
      phone: '8888888888',
      firstName: 'Akai',
      lastName: 'Senghor',
      age: 23,
      gender: 'male',
      bio: 'what dis',
      website: 'http://www.akaidasbest.com',
      job: 'software engineer',
      industry: 'software',
      employer: 'none',
    }
  }

  render() {
    return (
      <div className="col-md-12 journal-content">
        <h4>Hello, {this.state.username}</h4>
        <div className="individual-info">
          <p>Name</p>
          {this.state.firstName}, {this.state.lastName}
        </div>
        <button type="submit" className="btn btn-primary save-changes">Save Changes</button>
      </div>
    )
  }
}