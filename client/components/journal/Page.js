import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment' // useful for calculating and manipulating dates
import 'moment-range' // adds moment.range(start, end) functionality to moment library

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: props.focusDate,
      gratitudes: ['', '', ''],
      outlooks: ['', '', ''],
      affirmations: '',
      amazings: ['', '', ''],
      reflections: ['', '', '']
    }
    this.checkDatabaseForEntries(props.focusDate);
    this.entrySaveTimer;
  }

  componentWillReceiveProps(nextProps) {
    this.checkDatabaseForEntries(nextProps.focusDate);
  }

  componentWillUnmount() {
    this.updateEntriesInDatabase();
    clearTimeout(this.entrySaveTimer);
  }

  updateEntry(e) {
    // TODO: document the below process
    var ref = e.target.className;
    var value = e.target.value;
    if (ref !== 'affirmations') {
      var refs = ref.split(' ');
      var stateType = refs[0];
      var entryNumber = refs[1];
      var state = this.state[stateType];
      state[entryNumber] = value;
      this.setState({ [stateType]: state });
    } else if (ref === 'affirmations') {
      var { affirmations } = this.state;
      affirmations = value;
      this.setState({ 'affirmations': affirmations });
    }
    clearTimeout(this.entrySaveTimer);
    this.entrySaveTimer = setTimeout(() => {
      // console.log('Timeout cleared and saving entries to database');
      this.updateEntriesInDatabase();
    }, 500);
  }

  checkDatabaseForEntries(date) {
    // Check database for entries upon mount and update component state if any found
    axios.get('/api/journal', {
        params: {
          date: date
        }
      })
      .then((response) => {
        var data = response.data;
        // console.log(data);

        var gratitudes = data.gratitudes ? data.gratitudes.split(',') : ['', '', ''];
        var outlooks = data.outlooks ? data.outlooks.split(',') : ['', '', ''];
        var affirmations = data.affirmations ? data.affirmations : '';
        var amazings = data.amazings ? data.amazings.split(',') : ['', '', ''];
        var reflections = data.reflections ? data.reflections.split(',') : ['', '', ''];

        this.setState({
          gratitudes,
          outlooks,
          affirmations,
          amazings,
          reflections
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateEntriesInDatabase() {
    // Take any entries from user and update state in database
    axios.post('/api/journal', {
        date: this.props.focusDate,
        interface: 'web',
        gratitudes: this.state.gratitudes.join(),
        outlooks: this.state.outlooks.join(),
        affirmations: this.state.affirmations,
        amazings: this.state.amazings.join(),
        reflections: this.state.reflections.join()
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="page">
        <div className="page-date">{moment(this.props.focusDate).format('MMMM D[,] YYYY').toString()}</div>
        <div className="page-section gratitudes">
          <div className="page-title">Gratitudes</div>
          <div className="page-subtitle">List up to three things in your recent life that you are grateful for</div>
          <form className="page-form">
            <div className="page-input-container">
              1.
              {' '}
              <input
                type="text"
                placeholder="Express gratitude..."
                className="gratitudes 0"
                value={this.state.gratitudes[0] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
            <div className="page-input-container">
              2.
              {' '}
              <input
                type="text"
                placeholder="Express gratitude..."
                className="gratitudes 1"
                value={this.state.gratitudes[1] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
            <div className="page-input-container">
              3.
              {' '}
              <input
                type="text"
                placeholder="Express gratitude..."
                className="gratitudes 2"
                value={this.state.gratitudes[2] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
          </form>
        </div>
        <hr/>
        <div className="page-section outlooks">
          <div className="page-title">Outlooks</div>
          <div className="page-subtitle">What occurrences or events would make today great? Try to think of up to three</div>
          <form className="page-form">
            <div className="page-input-container">
              1.
              {' '}
              <input
                type="text"
                placeholder="Express hopes..."
                className="outlooks 0"
                value={this.state.outlooks[0] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
            <div className="page-input-container">
              2.
              {' '}
              <input
                type="text"
                placeholder="Express hopes..."
                className="outlooks 1"
                value={this.state.outlooks[1] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
            <div className="page-input-container">
              3.
              {' '}
              <input
                type="text"
                placeholder="Express hopes..."
                className="outlooks 2"
                value={this.state.outlooks[2] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
          </form>
        </div>
        <hr/>
        <div className="page-section affirmations">
          <div className="page-title">Affirmations</div>
          <div className="page-subtitle">What are you? How do you perceive yourself? List as many traits as you can think of (separated by commas)</div>
          <div className="page-subtext">When doing this exercise, don't worry about how you think others perceive you</div>
          <form className="page-form">
            <div className="page-input-container">
              <input
                type="text"
                placeholder="List traits..."
                className="affirmations"
                value={this.state.affirmations.length ? this.state.affirmations : ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
          </form>
        </div>
        <hr/>
        <div className="page-section amazings">
          <div className="page-title">Amazings</div>
          <div className="page-subtitle">What happened today that made the day amazing? Try to write down up to three</div>
          <form className="page-form">
            <div className="page-input-container">
              1.
              {' '}
              <input
                type="text"
                placeholder="Reflect on the positives..."
                className="amazings 0"
                value={this.state.amazings[0] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
            <div className="page-input-container">
              2.
              {' '}
              <input
                type="text"
                placeholder="Reflect on the positives..."
                className="amazings 1"
                value={this.state.amazings[1] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
            <div className="page-input-container">
              3.
              {' '}
              <input
                type="text"
                placeholder="Reflect on the positives..."
                className="amazings 2"
                value={this.state.amazings[2] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
          </form>
        </div>
        <hr/>
        <div className="page-section reflections">
          <div className="page-title">Reflections</div>
          <div className="page-subtitle">What could you have done to make today better?</div>
          <div className="page-subtext">Write down only things that you could have controlled. No use thinking about things outside of your control</div>
          <form className="page-form">
            <div className="page-input-container">
              1.
              {' '}
              <input
                type="text"
                placeholder="Identify growth opportunities..."
                className="reflections 0"
                value={this.state.reflections[0] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
            <div className="page-input-container">
              2.
              {' '}
              <input
                type="text"
                placeholder="Identify growth opportunities..."
                className="reflections 1"
                value={this.state.reflections[1] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
            <div className="page-input-container">
              3.
              {' '}
              <input
                type="text"
                placeholder="Identify growth opportunities..."
                className="reflections 2"
                value={this.state.reflections[2] || ''}
                onChange={this.updateEntry.bind(this)}
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}