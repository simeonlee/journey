import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Glyphicon } from 'react-bootstrap';
import Calendar from './analytics/Calendar'
import Timeline from './analytics/Timeline'
import Circles from './analytics/Circles'

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
        <div className="dashboard-calendar">
          <div className="calendar-header">
            <div className="calendar-title">Entries in the last year</div>
            <div className="calendar-settings">Calendar settings<Glyphicon glyph="triangle-bottom" /></div>
          </div>
          <Calendar
            startDelay={this.state.startDelay}
            elementDelay={this.state.data.elementDelay}
          />
        </div>
        <div className="dashboard-timeline">
          <Timeline />
        </div>
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