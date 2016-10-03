import React, { Component } from 'react'


export class Settings extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $("#prop-switch").bootstrapSwitch('state', this.props.user.wantsEmails);

  }

  render() {
    return (
      <div className="col-md-12 journal-content">
        <div>{this.props.user.username}</div>
        <div>{this.props.user.username}</div>
        <div><input id="prop-switch" type="checkbox" name="my-checkbox"/></div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </div>
    )
  }
}