import React, { Component } from 'react'
import { getWeek } from '../utilities/utilities'

export class Journal extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({ week: getWeek(0)})
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
          <div className="col-md-offset-2 col-md-8">
            <ul className="timeline">
              <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[0]}</a></li>
              <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[1]}</a></li>
              <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[2]}</a></li>
              <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[3]}</a></li>
              <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[4]}</a></li>
              <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[5]}</a></li>
              <li className="timeline-date"><a href="" className="activeClassName">{this.state.week[6]}</a></li>
            </ul>
            <div className="which-date"></div>
          </div>
        </div>
        <div className="col-md-offset-2 col-md-8">
          <div className="">
            
          </div>
        </div>

      </div>
    )
  }
}