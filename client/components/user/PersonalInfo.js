import React, { Component } from 'react'
import axios from 'axios'

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: {edit: false, info: ''},
      password: {edit: false, info: ''},
      email: {edit: false, info: ''},
      phone: {edit: false, info: ''},
      firstName: {edit: false, info: ''},
      lastName: {edit: false, info: ''},
      birthday: {edit: false, info: ''},
      gender: {edit: false, info: ''},
    }
    this._beingEdited = this._beingEdited.bind(this)
    this._edit = this._edit.bind(this)
    this._editOrSave = this._editOrSave.bind(this)
    this._saveInfo = this._saveInfo.bind(this)
  }

  componentDidMount() {
    for (var key in this.props.info) {
      if (key in this.state) {
        var item = {}
        var obj = Object.assign({}, this.state[key])
        obj.info = this.props.info[key]
        item[key] = obj
        this.setState(item)
      }
    }
  }

  _beingEdited(current, name) {
    if (current.edit) {
      return (
        <input type="text" className="personal-info-entry col-md-11" id={name} placeholder={current.info}/>
      )
    } else {
      return (<p className="personal-info-entry col-md-11">{current.info}</p>)
    }
  }

  _edit(passed) {
    var obj = {}
    var item = {
      edit: !this.state[passed].edit,
      info: this.state[passed].info
    }
    obj[passed] = item
    this.setState(obj)
  }

  _editOrSave(passed) {
    if (!this.state[passed].edit) {
      return (<div className="col-md-1"><button onClick={() => this._edit(passed)} type="button" className="journey-btn journey-btn-secondary journey-btn-sm">Edit</button></div>)
    } else {
      return <div className="col-md-1"><button onClick={() => this._saveInfo(passed)} type="button" className="journey-btn journey-btn-primary journey-btn-sm">Save</button></div>
    }
  }

  _saveInfo(passed) {
    var val = document.getElementById(passed).value
    var obj = {}
    var item = {
      edit: false,
      info: val
    }
    obj[passed] = item
    this.setState(obj)
    var sendObj = {}
    sendObj[passed] = val
    this.props.saveParent(sendObj)
    axios.post('/api/profile', {
      updated: JSON.stringify(sendObj)
    })
  }

  render() {
    return (
      <div className="col-md-12 journal-content">
        <h4>Hello, {this.state.firstName.info}!</h4>
        <div className="individual-info col-md-12">
          <h5>Name</h5>
          {this.state.firstName.info} {this.state.lastName.info}
        </div>
        <hr/>
        <div className="individual-info col-md-12">
          <h5 className="personal-headers col-md-11">Email</h5>
          <div className="flex flex-between">
            {this._beingEdited(this.state.email, 'email')}
            {this._editOrSave('email')}
          </div>
        </div>
        <hr/>
        <div className="individual-info col-md-12">
          <h5 className="personal-headers col-md-11">Phone</h5>
          <div className="flex flex-between">
            {this._beingEdited(this.state.phone, 'phone')}
            {this._editOrSave('phone')}
          </div>
        </div>
        <hr/>
        <div className="individual-info col-md-12">
          <h5 className="personal-headers col-md-11">Birthday</h5>
          <div className="flex flex-between">
            {this._beingEdited(this.state.birthday, 'birthday')}
            {this._editOrSave('birthday')}
          </div>
        </div>
        <hr/>
        <div className="individual-info col-md-12">
          <h5 className="personal-headers col-md-11">Gender</h5>
          <div className="flex flex-between">
            {this._beingEdited(this.state.gender)}
            {this._editOrSave('gender')}
          </div>
        </div>
      </div>
    )
  }
}