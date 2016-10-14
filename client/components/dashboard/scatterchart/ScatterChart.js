import React, { Component } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, CartesianGrid, Bar, Rectangle } from 'recharts'
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
    });
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
    var day, dayLetter;
    var dateRange = this.generateDateRange(2, 'week');

    for (var i = 0; i < dateRange.length; i++) {
      var date = dateRange[i];
      day = date.getDay();
      dayLetter = this.days[day];
      data.morning.push({
        dayLetter: dayLetter,
        day: day, // return day of week 0 - 6
        time: this.generateRandomTime(6, 12)
      });
      data.evening.push({
        dayLetter: dayLetter,
        day: day, // return day of week 0 - 6
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
    var morningColor="#F89406",
        eveningColor="#BE90D4";

    return (
      <div className="barchart">
        <ScatterChart width={this.state.width} height={window.innerHeight - 70} margin={{ top: 30, right: 20, bottom: 10, left: 10 }} >
          <XAxis dataKey="day" name="Day" unit="" />
          <YAxis dataKey="time" name="Time" unit=" o'clock"/>
          <CartesianGrid strokeDasharray="10 3" wrapperStyle={{ strokeWidth: '.5' }} />
          <Tooltip cursor={{ stroke: '#6C7A89', strokeDasharray: '4 10'}} wrapperStyle={{ backgroundColor: '#ccc', borderRadius: '2px' }} />
          <Legend iconSize={18} wrapperStyle={{color: 'white'}} />
          <Scatter name="Morning" shape="circle" data={this.generateTestData().morning} fill={morningColor} />
          <Scatter name="Evening" shape="circle" data={this.generateTestData().evening} fill={eveningColor} />
        </ScatterChart>
      </div>
    )
  }
}

// <ZAxis dataKey="z" range={[4, 20]} name="score" unit="km" />