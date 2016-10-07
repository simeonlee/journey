import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap';
// import { getWeek } from '../../utilities/utilities'
import Page from './Page'
import Timeline from './Timeline'
import moment from 'moment' // useful for calculating and manipulating dates
import 'moment-range' // adds moment.range(start, end) functionality to moment library

export default class Journal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment().startOf('day').subtract(1, 'week'),
      endDate: moment().startOf('day'),
      focusDate: moment().startOf('day').toISOString(),
    }
  }

  onDateClick(e) {
    var date = e.target.className.split(' ')[1];
    this.setState({ focusDate: moment(date).startOf('day').toISOString() });
    // console.log('state\'s focus date', this.state.focusDate);
  }

  onGlyphClick(e) {
    var classes = e.target.className;
    if (classes.indexOf('glyphicon-chevron-left') > -1) {
      var { startDate, endDate } = this.state;
      startDate = startDate.subtract(8, 'day');
      endDate = endDate.subtract(8, 'day');
      this.setState({ startDate, endDate });
    } else if (classes.indexOf('glyphicon-chevron-right') > -1) {
      var { startDate, endDate } = this.state;
      startDate = startDate.add(8, 'day');
      endDate = endDate.add(8, 'day');
      this.setState({ startDate, endDate });
    }
  }

  render() {
    return (
      <div className="journal-container">
        <div className="journal-timeline">
          <Glyphicon
            className="timeline-glyph"
            glyph="chevron-left"
            onClick={this.onGlyphClick.bind(this)}
          />
          <Timeline
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusDate={this.state.focusDate}
            onDateClick={this.onDateClick.bind(this)}
          />
          <Glyphicon
            className="timeline-glyph"
            glyph="chevron-right"
            onClick={this.onGlyphClick.bind(this)}
          />
        </div>
        <div className="journal-page">
          <Page
            focusDate={this.state.focusDate}
          />
        </div>
      </div>
    )
  }
}