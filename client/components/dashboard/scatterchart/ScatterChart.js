import React, { Component } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, CartesianGrid, Bar } from 'recharts'
import d3 from 'd3'
import moment from 'moment'
import axios from 'axios'

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.limit = 5;
    this.state = {
      width: (window.innerWidth * 3 / 4),
      data: {}
    }
    this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  }

  componentWillMount() {
    axios.get('/api/entries')
    .then(entries => {
      this.formatData(entries.data);
    })
  }

  formatData(data) {
    var formattedData = {
      morning: [],
      evening: []
    }
    var time, day = 0;
    var currentDate = data[data.length-1].updatedAt.split('T')[0];
    
    for (var i = 0; i < data.length; i++) {
      if (data[i].updatedAt.split('T')[0] !== currentDate) {
        day++;
      }
      if (data[i].morning) {
        time = this.formatTime(data[i].morning);
        formattedData.morning.push({
          day: day,
          time: time
        })
      }
      if (data[i].evening) {
        time = this.formatTime(data[i].evening);
        formattedData.evening.push({
          day: day,
          time: time
        })
      }
    }

    this.setState({data: formattedData});
  }

  formatTime(date) {
    var time = date.split(' ')[3].split(':');
    time = parseInt(time[0]) + parseInt(time[1])/60;
    return time;
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
        <ScatterChart width={this.state.width} height={window.innerHeight - 70} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
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