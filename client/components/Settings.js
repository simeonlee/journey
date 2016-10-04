import React, { Component } from 'react'


export class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'wakaflackflame',
      wantsEmails: false,
      wantsTexts: false
    }
  }

  componentDidMount() {
    $("#text-switch").bootstrapSwitch('state', this.state.wantsTexts);
    $('#text-switch').on('switchChange.bootstrapSwitch', (event, state) => {
      this.setState({
        wantsTexts: state
      })
    })
    $("#email-switch").bootstrapSwitch('state', this.state.wantsEmails);
    $('#email-switch').on('switchChange.bootstrapSwitch', (event, state) => {
      this.setState({
        wantsEmails: state
      })
    })
  }

  render() {
    return (
      <div className="col-md-12 journal-content">
        <div>Hello, {this.state.username}</div>
        <div>
          <p>Do you want text message alerts?</p>
          <input onClick={() => this._switch('wantsTexts')} id="text-switch" type="checkbox" name="my-checkbox"/>
        </div>
        <div>
          <p>Do you want email message alerts?</p>
          <input onClick={() => this._switch('wantsEmails')} id="email-switch" type="checkbox" name="my-checkbox"/>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </div>
    )
  }
}