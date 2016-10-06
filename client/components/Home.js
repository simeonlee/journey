import React, { Component } from 'react'

export class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="homepage-background">
        <div className="home-top-content-container col-md-10 col-md-offset-1">
          <div>
            <div className="col-md-6">
              <h1>
                Home
              </h1>
            </div>
            <div className="col-md-6">
              <h1>
                Test
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}