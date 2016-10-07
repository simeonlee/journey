import React, { Component } from 'react';
import Nav from './nav/Nav'

export default class RouterContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav logInOrOut={"Log In"} />
        {this.props.children}
      </div>
    )
  }
}