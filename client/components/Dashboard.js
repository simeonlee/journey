import React, { Component } from 'react'
import Circles from './analytics/Circles'
import Calendar from './analytics/Calendar'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        url: './data/sample.json',
        elementDelay: 100
      },
      startDelay: 2000
    };
  }
  render() {
    return (
      <div className="dashboard-container">
        <Calendar />
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