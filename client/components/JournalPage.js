import React, { Component } from 'react'

export class JournalPage extends Component {
  constructor(props) {
    super(props)
    this.grateful = this.grateful.bind(this)
    this.outlook = this.outlook.bind(this)
    this.affirmation = this.affirmation.bind(this)
    this.amazing = this.amazing.bind(this)
    this.reflection = this.reflection.bind(this)
  }

  grateful() {
    if (this.props.data.length > 0) {
      if (this.props.data[2].length > 0) {
        console.log(this.props.data)
        return this.props.data[2][0].entry
      }
    }
  }

  outlook() {
    if (this.props.data.length > 0) {
      if (this.props.data[3].length > 0) {
        return this.props.data[3][0].entry
      }
    }
  }

  affirmation() {
    if (this.props.data.length > 0) {
      if (this.props.data[0].length > 0) {
        return this.props.data[0][0].entry
      }
    }
  }

  amazing() {
    if (this.props.data.length > 0) {
      if (this.props.data[1].length > 0) {
        return this.props.data[1][0].entry
      }
    }
  }

  reflection() {
    if (this.props.data.length > 0) {
      if (this.props.data[4].length > 0) {
        return this.props.data[4][0].entry
      }
    }
  }


  render() {
    return (
      <div className="journal-content">
        <div className="gratitude journal-section">
          <h4 className="title">I am grateful for...</h4>
          <div className="section-entry">{this.grateful()}</div>
        </div>
        <hr/>
        <div className="outlook journal-section">
          <h4 className="title">What would make today great?</h4>
          <div className="section-entry">{this.outlook()}</div>
        </div>
        <hr/>
        <div className="affirmations journal-section">
          <h4 className="title">Daily affirmations. I was...</h4>
          <div className="section-entry">{this.affirmation()}</div>
        </div>
        <hr/>
        <div className="amazings journal-section">
          <h4 className="title">Three amazings things about today</h4>
          <div className="section-entry">{this.amazing()}</div>

        </div>
        <hr/>
        <div className="reflections journal-section">
          <h4 className="title">What could have made today better?</h4>
          <div className="section-entry">{this.reflection()}</div>
        </div>
      </div>
    )
  }
}
