import React, { Component } from 'react'

export class JournalPage extends Component {
  constructor(props) {
    super(props)
    this.test = this.test.bind(this)
  }

  test() {
    if (this.props.data.length > 0) {
      return this.props.data[0][0].entry
    }
  }

  render() {
    return (
      <div className="journal-content">
        <div className="gratitude journal-section">
          <h4 className="title">I am grateful for...</h4>
          <div className="section-entry">{this.test()}</div>
        </div>
        <hr/>
        <div className="outlook journal-section">
          <h4 className="title">What would make today great?</h4>
          <div className="section-entry">blah blah, blah blah blah</div>
        </div>
        <hr/>
        <div className="affirmations journal-section">
          <h4 className="title">Daily affirmations. I was...</h4>
          <div className="section-entry">blah blah, blah blah blah</div>
        </div>
        <hr/>
        <div className="amazings journal-section">
          <h4 className="title">Three amazings things about today</h4>
          <div className="section-entry">blah blah, blah blah blah</div>

        </div>
        <hr/>
        <div className="reflections journal-section">
          <h4 className="title">What could have made today better?</h4>
          <div className="section-entry">blah blah, blah blah blah</div>
        </div>
      </div>
    )
  }
}
