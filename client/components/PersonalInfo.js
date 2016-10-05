import React, { Component } from 'react'

export class PersonalInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: {edit: false, info: 'wakaflackaflame'},
      password: {edit: false, info: 'yumyum'},
      email: {edit: false, info: 'fakemail@sofake.com'},
      phone: {edit: false, info: '8888888888'},
      firstName: {edit: false, info: 'Akai'},
      lastName: {edit: false, info: 'Senghor'},
      birthday: {edit: false, info: '3/7/1993'},
      gender: {edit: false, info: 'male'},
      bio: 'what dis',
      website: 'http://www.akaidasbest.com',
      job: {edit: false, info: 'software engineer'},
      industry: 'software',
      employer: 'none',
    }
    this._beingEditted = this._beingEditted.bind(this)
    this._edit = this._edit.bind(this)
    this._editOrSave = this._editOrSave.bind(this)
    this._saveInfo = this._saveInfo.bind(this)
  }

  _beingEditted(current, name) {
    console.log(current.edit)
    if (current.edit) {
      return (
        <input type={name} className="form-control" id="edit" placeholder={current.info}/>
      )
    } else {
      return (<p>{current.info}</p>)
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
    console.log(obj)
  }

  _editOrSave(passed) {
    if (!this.state[passed].edit) {
      return (<button onClick={() => this._edit(passed)} type="button" className="btn btn-default btn-sm">Edit</button>)
    } else {
      return <button onClick={() => this._saveInfo(passed)} type="button" className="btn btn-default btn-sm">Save</button>
    }
  }

  _saveInfo(passed) {
    console.log('saving!')
    this._edit(passed)
  }

  render() {
    return (
      <div className="col-md-12 journal-content">
        <h4>Hello, {this.state.username.info}</h4>
        <div className="individual-info">
          <h5>Name</h5>
          {this.state.firstName.info}, {this.state.lastName.info}
        </div>
        <div className="individual-info">
          <h5>Email</h5>
          {this._beingEditted(this.state.email, 'email')}
          {this._editOrSave('email')}
        </div>
        <div className="individual-info">
          <h5>Phone</h5>
          {this._beingEditted(this.state.phone)}
          <button onClick={() => this._edit('phone')} type="button" className="btn btn-default btn-sm">Edit</button>
        </div>
        <div className="individual-info">
          <h5>Birthday</h5>
          {this._beingEditted(this.state.birthday)}
          <button onClick={() => this._edit('birthday')} type="button" className="btn btn-default btn-sm">Edit</button>
        </div>
        <div className="individual-info">
          <h5>Gender</h5>
          {this._beingEditted(this.state.gender)}
          <button onClick={() => this._edit('gender')} type="button" className="btn btn-default btn-sm">Edit</button>
        </div>
        <button type="submit" className="btn btn-primary save-changes">Save Changes</button>
      </div>
    )
  }
}