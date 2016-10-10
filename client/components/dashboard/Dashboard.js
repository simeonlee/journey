import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Glyphicon } from 'react-bootstrap';
import Circles from './circles/Circles'
import Calendar from './calendar/Calendar'
import WordCloud from './wordcloud/WordCloud'
import ScatterChart from './scatterchart/ScatterChart'
import ActivityFeed from './activityFeed/ActivityFeed'
import axios from 'axios'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        circlesUrl: './data/sample.json',
        wordCloudUrl: './data/wordCloudSample.js',
        elementDelay: 10
      },
      startDelay: 20
    };

    // Send request to server to run some analytics on user's journal for later retrieval
    axios.post('/api/analytics')
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
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
            <div className="header-subtitle dashboard-jump">Time travel to<Glyphicon glyph="triangle-bottom" /></div>
          </div>
          <ScatterChart />
        </div>
        <div className="dashboard-element dashboard-circles">
          <div className="dashboard-header circles-header">
            <div className="header-title dashboard-title">Pensieve</div>
            <div className="header-subtitle dashboard-jump">Time travel to<Glyphicon glyph="triangle-bottom" /></div>
          </div>
          <Circles
            startDelay={this.state.startDelay}
            elementDelay={this.state.data.elementDelay}
            json={this.state.data.circlesUrl}
          />
          <div className="dashboard-footer circles-footer">
            <div className="quote">
              <div className="footer-text quote-text">I use the Pensieve. One simply siphons the excess thoughts from one's mind, pours them into the basin, and examines them at one's leisure. It becomes easier to spot patterns and links, you understand, when they are in this form.</div>
              <div className="footer-text quote-attribution">- Albus Dumbledore, <span>Harry Potter and the Goblet of Fire</span></div>
            </div>
          </div>
        </div>
        <div className="dashboard-element dashboard-activity-feed">
          <div className="dashboard-header activity-feed-header">
            <div className="header-title dashboard-title">Steps taken in your journey</div>
            <div className="header-subtitle dashboard-jump">Time travel to<Glyphicon glyph="triangle-bottom" /></div>
          </div>
          <ActivityFeed />
        </div>
      </div>

    )
  }
}

/*

<div className="dashboard-element dashboard-wordcloud">
  <div className="dashboard-header wordcloud-header">
    <div className="header-title dashboard-title">Thought Cloud</div>
    <div className="header-subtitle dashboard-jump">Time travel to<Glyphicon glyph="triangle-bottom" /></div>
  </div>
  <WordCloud
    data={this.state.data.wordCloudUrl}
  />
</div>

*/