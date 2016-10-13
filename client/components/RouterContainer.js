import React, { Component } from 'react'
import Nav from './nav/Nav'
import axios from 'axios'

export default class RouterContainer extends Component {
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
    return (
      <div>
        {renderNav}
        {this.props.children}
      </div>
    )
  }
}