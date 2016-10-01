import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Glyphicon } from 'react-bootstrap';
import Calendar from './analytics/calendar/Calendar'
import Circles from './analytics/Circles'
import ScatterChart from './analytics/scatterchart/ScatterChart'
import Timeline from './analytics/timeline/Timeline'

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
        <div className="dashboard-element dashboard-calendar">
          <div className="dashboard-header calendar-header">
            <div className="header-title calendar-title">Entries in the last year</div>
            <div className="header-subtitle calendar-settings">Calendar settings<Glyphicon glyph="triangle-bottom" /></div>
          </div>
          <Calendar
            startDelay={this.state.startDelay}
            elementDelay={this.state.data.elementDelay}
          />
        </div>
        <div className="dashboard-element dashboard-scatterchart">
          <div className="dashboard-header scatterchart-header">
            <div className="header-title dashboard-title">Interactions by time</div>
            <div className="header-subtitle dashboard-jump">Jump to<Glyphicon glyph="triangle-bottom" /></div>
          </div>
          <ScatterChart />
        </div>
        <div className="dashboard-element dashboard-timeline">
          <div className="dashboard-header timeline-header">
            <div className="header-title dashboard-title">Steps taken in your journey</div>
            <div className="header-subtitle dashboard-jump">Jump to<Glyphicon glyph="triangle-bottom" /></div>
          </div>
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

<div className="dashboard-body"></div>

*/