import React, { Component } from 'react'
import axios from 'axios'
import { BasicInteraction } from './BasicInteraction'

export default class ActivityFeed extends Component {
  constructor(props) {
    super(props);
    this.limit = 5;
    this.state = {
      entries: []
    }
    this._populateInteractions = this._populateInteractions.bind(this)
  }

  componentWillMount() {
    axios.get('/api/entries', {
      params: {
        limit: this.limit
      }
    })
    .then(entries => {
      this.setState({
        entries: entries.data
      })
      console.log(entries);
    })
  }

  _populateInteractions() {
    if (this.state.entries.length > 0) {
      return this.state.entries.map(entry => {
        return (<BasicInteraction entry={entry}/>)
      })
    }
  }

  render() {
    return (
      <div className="activity-feed">
        {this._populateInteractions()}
      </div>
    )
  }
}

/** 
 * <BasicInteraction />
 */