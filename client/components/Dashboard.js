import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Circles from './analytics/Circles'
import Calendar from './analytics/Calendar'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        url: './data/sample.json',
        elementDelay: 10
      },
      startDelay: 20
    };
  }
  render() {
    return (
      <div className="dashboard">
        <Calendar 
          startDelay={this.state.startDelay}
          elementDelay={this.state.data.elementDelay}
        />
      </div>
    )
  }
}

/*
<Circles
  startDelay={this.state.startDelay}
  elementDelay={this.state.data.elementDelay}
  json={this.state.data.url}
/>
*/