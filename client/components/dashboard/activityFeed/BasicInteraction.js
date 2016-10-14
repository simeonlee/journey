import React, { Component } from 'react'
import moment from 'moment'

export class BasicInteraction extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="basic-interaction">
        <div className="interaction-symbol"></div>
        <div className="interaction-type">{moment(this.props.entry.datetime).format('LL')}</div>
        <div className="interaction-summary">You completed {Math.floor(((this.props.entry.morningCount + this.props.entry.eveningCount) / 13) * 100)}% of your Journey</div>
        <div className="interaction-date">{moment(this.props.entry.morning).calendar()}</div>
      </div>
    )
  }
}