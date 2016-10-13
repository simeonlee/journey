import React, { Component } from 'react'
import axios from 'axios'
import BasicInteraction from './BasicInteraction'

export default class ActivityFeed extends Component {
  constructor(props) {
    super(props);
    this.limit = 5;
  }

  componentWillMount() {
    axios.get('/api/entries', {
      params: {
        limit: this.limit;
      }
    })
    .then(recent => {
      console.log(recent);
    })
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