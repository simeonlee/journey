import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      firstName: '',
      wantsEmails: false,
      wantsTexts: false,
      id: ''
    }
    this._changeHour = this._changeHour.bind(this);
    this._changeMinute = this._changeMinute.bind(this);
    this._canEditTime = this._canEditTime.bind(this);
    this._save = this._save.bind(this);
    this._initializeSwitches = this._initializeSwitches.bind(this);
    this._linkToAmazon = this._linkToAmazon.bind(this);
  }

  componentDidMount() {
    $('#text-switch').on('switchChange.bootstrapSwitch', (event, state) => {
      this.setState({
        wantsTexts: state
      })
      this._save();
    })
    $('#email-switch').on('switchChange.bootstrapSwitch', (event, state) => {
      this.setState({
        wantsEmails: state
      })
      this._save();
    })
    for (var key in this.props.info) {
      if (key in this.state) {
        var obj = {}
        obj[key] = this.props.info[key]
        this.setState(obj)
      }
    }
    this._initializeSwitches()
  }

  _linkToAmazon() {
    axios.get('/linkToAmazon')
      .then((res) => {
        location.href='/auth/amazon';
      })
  }
  _linkToFacebook() {
    axios.get('/linkToFacebook')
      .then((res) => {
        location.href='/auth/facebook';
      })
  }

  _changeHour(event) {
    this.setState({
      hour: event.target.value
    })
  }

  _changeMinute(event) {
    this.setState({
      minute: event.target.value
    })
  }

  _morningOrEvening(event) {
    this.setState({
      amOrPm: event.target.value
    })
  }

  _canEditTime() {
    return !(this.state.wantsTexts || this.state.wantsEmails)
  }

  _save() {
    axios.post('/api/profile', {
      updated: JSON.stringify(this.state)
    })
    this.props.saveParent(this.state)
  }

  _initializeSwitches () {
    $("#text-switch").bootstrapSwitch('state', this.state.wantsTexts);
    $("#email-switch").bootstrapSwitch('state', this.state.wantsEmails);
  }

  render() {
    this._initializeSwitches();
    return (
      <div className="col-md-12 journal-content">
        <h4>Hello, {this.state.firstName}!</h4>
        <div className="individual-setting">
          <p>Do you want text message alerts?</p>
          <input id="text-switch" type="checkbox" name="my-checkbox"/>
        </div>
        <div className="individual-setting">
          <p>Do you want email message alerts?</p>
          <input id="email-switch" type="checkbox" name="my-checkbox"/>
        </div>
        <div className="individual-setting">
          <p>What time would you like to be notified?</p>
          <select disabled={this._canEditTime()} className="hour-drop" onChange={this._changeHour}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>
          :
          <select disabled={this._canEditTime()} onChange={this._changeMinute}><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option></select>
          <select disabled={this._canEditTime()} onChange={this._morningOrEvening}>
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
        <div className="individual-setting">
          <div
           className="journey-btn journey-btn-auth journey-btn-facebook"
           onClick={this._linkToFacebook}
          >
           Connect to Facebook
          </div>
          <p className="amazon-bumper">Link your account to Amazon to write in your journal via Alexa</p>
          <div
           className="journey-btn journey-btn-auth journey-btn-amazon"
           onClick={this._linkToAmazon}
          >
           Connect to Amazon
          </div>
        </div>
        <button onClick={this._save} type="submit" className="journey-btn journey-btn-primary save-changes">Save Changes</button>
      </div>
    )
  }
}