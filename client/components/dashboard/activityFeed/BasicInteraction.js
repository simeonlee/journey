import React, { Component } from 'react'
import moment from 'moment'

const BasicInteraction = ({entry}) => {
  const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return (
    <div className="basic-interaction">
      {/*<div className="interaction-symbol"></div>*/}
      <div className="int-date">{weekdays[moment(entry.datetime).weekday()] + ', ' + moment(entry.datetime).format('LL')}</div>
      <div className="int-summary">You completed {Math.floor(((entry.morningCount + entry.eveningCount) / 13) * 100)}% of your Journey</div>
      <div className="int-timestamp">{moment(entry.morning).calendar()}</div>
    </div>
  )
}

export default BasicInteraction