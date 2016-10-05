import React, { Component } from 'react'
import BasicInteraction from './BasicInteraction'

export default class ActivityFeed extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="activity-feed">
        <BasicInteraction />
        <BasicInteraction />
        <BasicInteraction />
        <BasicInteraction />
        <BasicInteraction />
      </div>
    )
  }
}