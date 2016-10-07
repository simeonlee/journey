import React, { Component } from 'react'

export default class Timeline extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="basic-interaction">
        <div className="interaction-symbol"><img className="interaction-icon" src="../../../images/icons/journal/journal.png" /></div>
        <div className="interaction-type">gratitude</div>
        <div className="interaction-summary">This day you were thankful for the opportunity to help others</div>
        <div className="interaction-date">Sep 21</div>
      </div>
    )
  }
}