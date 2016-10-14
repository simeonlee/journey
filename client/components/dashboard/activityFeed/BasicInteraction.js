import React, { Component } from 'react'
import moment from 'moment'

const BasicInteraction = ({entry}) => {
  return (
    <div className="basic-interaction">
      {/*<div className="interaction-symbol"></div>*/}
      <div className="interaction-type">{moment(entry.datetime).format('LL')}</div>
      <div className="interaction-summary">You completed {Math.floor(((entry.morningCount + entry.eveningCount) / 13) * 100)}% of your Journey</div>
      <div className="interaction-date">{moment(entry.morning).calendar()}</div>
    </div>
  )
}

export default BasicInteraction