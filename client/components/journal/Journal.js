import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap';
import { getWeek } from '../../utilities/utilities'
import Page from './Page'
import Timeline from './Timeline'
import axios from 'axios'
import moment from 'moment' // useful for calculating and manipulating dates
import 'moment-range' // adds moment.range(start, end) functionality to moment library

export default class Journal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment().startOf('day').subtract(1, 'week'),
      endDate: moment().startOf('day'),
      focusDate: moment().startOf('day'),
    }

    // this.updateDateRange();
  }

  updateDateRange(newFocusDate) {

    // update our dateRange state if our current dateRange does not contain the new focused date
    // if (!this.state.dateRange.contains(newFocusDate)) {

    // }

    // Display a week's worth of dates in journal navigation
    var start = moment().startOf('day').subtract(1, 'week').toDate();
    var end = moment().startOf('day').toDate();
    var range = moment.range(start, end);
    console.log(range);
    // this.setState('dateRange', range);

  }

  dayEntry() {

  }

  onClick(date) {

  }

  currentDay() {

  }

  render() {
    return (
      <div>
        <div className="journal-timeline">
          <Glyphicon glyph="chevron-left" />
          <Timeline
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusDate={this.state.focusDate}
          />
          <Glyphicon glyph="chevron-right" />
        </div>
      </div>
    )
  }
}

// <div className="col-md-offset-2 col-md-8 main-content">
//   <ul className="timeline">
//     <li className="timeline-date" onClick={() => {this.onClick(this.state.week[0])}}>{this.state.week[0]}</li>
//     <li className="timeline-date" onClick={() => {this.onClick(this.state.week[1])}}>{this.state.week[1]}</li>
//     <li className="timeline-date" onClick={() => {this.onClick(this.state.week[2])}}>{this.state.week[2]}</li>
//     <li className="timeline-date" onClick={() => {this.onClick(this.state.week[3])}}>{this.state.week[3]}</li>
//     <li className="timeline-date" onClick={() => {this.onClick(this.state.week[4])}}>{this.state.week[4]}</li>
//     <li className="timeline-date" onClick={() => {this.onClick(this.state.week[5])}}>{this.state.week[5]}</li>
//     <li className="timeline-date" onClick={() => {this.onClick(this.state.week[6])}}>{this.state.week[6]}</li>
//   </ul>
//   <Page data={this.state.data}/>
// </div>