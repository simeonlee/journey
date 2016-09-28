import React, { Component } from 'react'
import Affirmations from './analytics/Affirmations'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/98887/d3pack-flare-short.json',
        elementDelay: 100
      },
      startDelay: 2000
    };
  }
  componentDidMount() {
    console.log('rendering');
  }
  render() {
    var style = {
      width: '100%',
      height: '100%'
    };
    return (
      <div style={style}>
        <Affirmations
          startDelay={this.state.startDelay}
          elementDelay={this.state.data.elementDelay}
          json={this.state.data.url}
        />
      </div>
    )
  }
}