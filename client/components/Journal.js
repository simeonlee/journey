import React, { Component } from 'react'
import { getWeek } from '../utilities/utilities'


export class Journal extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({ week: getWeek(0)})
    //fetch('localhost:3000/api/journal/' + this.state.userId + '/' + this.state.date)
  }

  render() {
    return (
      <div>
        <div className="col-md-offset-2 col-md-8 main-content">
          <ul className="timeline">
            <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[0]}</a></li>
            <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[1]}</a></li>
            <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[2]}</a></li>
            <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[3]}</a></li>
            <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[4]}</a></li>
            <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[5]}</a></li>
            <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[6]}</a></li>
          </ul>
          <div className="journal-content">
            <div className="gratitude journal-section">
              <h4 className="title">I am grateful for...</h4>
              <div className="section-entry">blah blah, blah blah blah</div>
            </div>
            <hr/>
            <div className="outlook journal-section">
              <h4 className="title">What would make today great?</h4>
              <div className="section-entry">blah blah, blah blah blah</div>
            </div>
            <hr/>
            <div className="affirmations journal-section">
              <h4 className="title">Daily affirmations. I was...</h4>
              <div className="section-entry">blah blah, blah blah blah</div>
            </div>
            <hr/>
            <div className="amazings journal-section">
              <h4 className="title">Three amazings things about today</h4>
              <div className="section-entry">blah blah, blah blah blah</div>

            </div>
            <hr/>
            <div className="reflections journal-section">
              <h4 className="title">What could have made today better?</h4>
              <div className="section-entry">blah blah, blah blah blah</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}