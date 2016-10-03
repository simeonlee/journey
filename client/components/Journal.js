import React, { Component } from 'react'
import { getWeek } from '../utilities/utilities'
import { JournalPage } from './JournalPage'


export class Journal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.onClick = this.onClick.bind(this)
    this.currentDay = this.currentDay.bind(this)
    this.dayEntry = this.dayEntry.bind(this)
  }

  componentWillMount() {
    var week = getWeek(0)
    this.setState({
      week: week,
      date: week[0]
    })
    //fetch('localhost:3000/api/journal/' + this.state.userId + '/' + this.state.date)
  }

  dayEntry() {
    var day = this.currentDay()
    var split = day.split('/')
    var context = this;
    $.ajax({
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      url: '/api/journal/1/' + split[0] + '/' + split[1] + '/' + '2016',
      success: function(data) {
        context.setState({data: data})
        console.log(data);
      },
      error: function(data) {
        console.log(data)
      }
    })
  }

  onClick(date) {
    this.setState({
      date: date
    })
    this.dayEntry()
  }

  currentDay() {
    return this.state.date
  }

  render() {
    return (
      <div>
        <div className="col-md-offset-2 col-md-8 main-content">
          <ul className="timeline">
            <li className="timeline-date" onClick={() => {this.onClick(this.state.week[0])}}>{this.state.week[0]}</li>
            <li className="timeline-date" onClick={() => {this.onClick(this.state.week[1])}}>{this.state.week[1]}</li>
            <li className="timeline-date" onClick={() => {this.onClick(this.state.week[2])}}>{this.state.week[2]}</li>
            <li className="timeline-date" onClick={() => {this.onClick(this.state.week[3])}}>{this.state.week[3]}</li>
            <li className="timeline-date" onClick={() => {this.onClick(this.state.week[4])}}>{this.state.week[4]}</li>
            <li className="timeline-date" onClick={() => {this.onClick(this.state.week[5])}}>{this.state.week[5]}</li>
            <li className="timeline-date" onClick={() => {this.onClick(this.state.week[6])}}>{this.state.week[6]}</li>
          </ul>
          <JournalPage data={this.state.data}/>
        </div>
      </div>
    )
  }
}