import React, { Component } from 'react';
import { Nav } from './Nav'


export class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav logInOrOut={"Log In"}/>
        {this.props.children}
      </div>
    )
  }
}