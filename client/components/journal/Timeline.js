import React, { Component } from 'react'
import moment from 'moment' // useful for calculating and manipulating dates
import 'moment-range' // adds moment.range(start, end) functionality to moment library

const Timeline = (props) => {

  // create moment range out of the moment start date and moment end date
  var range = moment.range(props.startDate, props.endDate);

  // create array of moment objects by day
  var days = [];
  range.by('days', (day) => {
    days.push(day);
  });


  return (
    <div className="timeline">
      {days.map((day) => (
        <div
          className={'timeline-day ' + day.toISOString()}
          key={day.toISOString()}
          onClick={props.onDateClick}
        >{day.format('M[/]D').toString()}</div>
      ))}
    </div>
  )
}

export default Timeline