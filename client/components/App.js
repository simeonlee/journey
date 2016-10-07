import React, { Component } from 'react';
import { Nav } from './Nav'
import axios from 'axios';

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    axios.get('/auth')
      .then((res) => {
        if (!res.data) {
          this.setState({loggedIn: false});
        } else {
          this.setState({loggedIn: true});
        }
      })
  }

  render() {
    var renderNav = this.state.loggedIn ? <Nav logInOrOut={'Log In'}/> : null;
    console.log('logged in: ', this.state.loggedIn)
    console.log(this.props.children);

    return (
      <div>
        {renderNav}
        {this.props.children}
      </div>
    )
  }
}