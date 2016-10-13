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

  const weekdays = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  return (
    <div className="timeline">
      {days.map((day) => (
        <div className="timeline-marker" key={day.toISOString()}>
          <div
            className={'timeline-weekday ' + day.toISOString()}
            onClick={props.onDateClick}
          >{weekdays[day.weekday()]}</div>
          <div
            className={'timeline-date ' + day.toISOString()}
            onClick={props.onDateClick}
          >{day.format('M[/]D').toString()}</div>
        </div>
      ))}
    </div>
  )
}

export default Timeline