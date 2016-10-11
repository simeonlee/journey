import React, { Component } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, CartesianGrid, Bar } from 'recharts'
import d3 from 'd3'
import moment from 'moment'

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: (window.innerWidth * 3 / 4)
    }
    this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  }

  generateTestData() {
    var data = {
      morning: [],
      evening: []
    };
    var dateRange = this.generateDateRange(2, 'week');
    for (var i = 0; i < dateRange.length; i++) {
      var date = dateRange[i];
      data.morning.push({
        day: date.getDay(), // return day of week 0 - 6
        time: this.generateRandomTime(6, 12)
      });
      data.evening.push({
        day: date.getDay(), // return day of week 0 - 6
        time: this.generateRandomTime(12, 24)
      });
    }
    return data;
  }

  generateDateRange(intervals, type) {
    var start = moment().startOf('day').subtract(intervals, type).toDate();
    var end = moment().startOf('day').toDate();
    return d3.time.days(start, end);
  }

  generateRandomTime(startHour, endHour) {
    return startHour + Math.floor((Math.random() * (endHour - startHour)) * 100) / 100;
  }

  render() {
    return (
      <div className="barchart">
        <ScatterChart width={this.state.width} height={200} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <XAxis dataKey="day" name="day" unit="" />
          <YAxis dataKey="time" name="time" unit=" o'clock" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip cursor={{strokeDasharray: '3 3'}} />
          <Legend />
          <Scatter name="morning" data={this.generateTestData().morning} fill="#9C9C9C" />
          <Scatter name="evening" data={this.generateTestData().evening} fill="#666666" />
        </ScatterChart>
      </div>
    )
  }
}

// <ZAxis dataKey="z" range={[4, 20]} name="score" unit="km" />