import React, { Component } from 'react'
import axios from 'axios'
import { BasicInteraction } from './BasicInteraction'
import moment from 'moment'

export default class ActivityFeed extends Component {
  constructor(props) {
    super(props);
    this.limit = 0;
    this.state = {
      entries: []
    }
    this._populateInteractions = this._populateInteractions.bind(this)
    this._streak = this._streak.bind(this)
    this._checkStreak = this._checkStreak.bind(this)
    this._moreHistory = this._moreHistory.bind(this)
  }

  componentWillMount() {
    this._moreHistory()
  }

  _moreHistory() {
    this.limit += 5;
    axios.get('/api/entries', {
      params: {
        limit: this.limit
      }
    })
    .then(entries => {
      this.setState({
        entries: entries.data.reverse()
      });
    })
  }

  _checkStreak() {
    var current = moment().startOf('day');
    var count = 0;
    var counting = true;
    this.state.entries.reverse().forEach(entry => {
      if (counting === true && current.format('LLLL') === moment(entry.datetime).startOf('day').format('LLLL')) {
        count++
      } else {
        counting = false
      }
      current.subtract(1, 'days')
    })
    this.state.entries.reverse()
    return count;
  }

  _streak() {
    if (this.state.entries.length > 0) {
      return (<h4 className="streak-header">Your are on a {this._checkStreak()} day streak!</h4>)
    }
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
        {this._streak()}
        {this._populateInteractions()}
        <button onClick={() => this._moreHistory()} type="button" className="btn btn-default center-block">Show More</button>
      </div>
    )
  }
}

/** 
 * <BasicInteraction />
 */