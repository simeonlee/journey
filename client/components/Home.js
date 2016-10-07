import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="col-md-offset-2 col-md-8">
        <h1>
          Welcome to Journey.
        </h1>
      </div>
    )
  }
}