import React, { Component } from 'react'
import axios from 'axios'
import BasicInteraction from './BasicInteraction'
import moment from 'moment'

export default class ActivityFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    }
    this.limit = 0;
    this._populateInteractions = this._populateInteractions.bind(this)
    this._streak = this._streak.bind(this)
    this._checkStreak = this._checkStreak.bind(this)
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
        entries: entries.data
      });
    })
  }

  _checkStreak() {
    var current = moment().startOf('day');
    var count = 0;
    var counting = true;
    this.state.entries.slice().forEach(entry => {
      if (counting === true && current.format('LLLL') === moment(entry.datetime).startOf('day').format('LLLL')) {
        count++;
      } else {
        counting = false;
      }
      current.subtract(1, 'days');
    })
    return count;
  }

  _streak() {
    if (this.state.entries.length > 0) {
      return (<div className="streak">You are on a {this._checkStreak()} day streak!</div>);
    };
  }

  _populateInteractions() {
    if (this.state.entries.length > 0) {
      return this.state.entries.map(entry => {
        // Prevent 0% journal page progress from being shown via check below
        var totalEntryCountForDay = entry.morningCount + entry.eveningCount;
        return totalEntryCountForDay > 0 ? <BasicInteraction entry={entry}/> : null;
      });
    };
  }

  render() {
    return (
      <div className="activity-feed">
        {this._streak()}
        {this._populateInteractions()}
        <div className="flex flex-center">
          <div onClick={this._moreHistory.bind(this)} className="journey-btn journey-btn-primary">Show Earlier Activity</div>
        </div>
      </div>
    )
  }
}

/** 
 * <BasicInteraction />
 */