import React, { Component } from 'react';
import { Nav } from './Nav'
import { Home } from './Home'

export class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav />
        {this.props.children || <Home/>}
      </div>
    )
  }
}