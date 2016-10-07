import React, { Component } from 'react'
import { Settings } from './Settings'
import { PersonalInfo } from './PersonalInfo'
import axios from 'axios'

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      section: 'settings',
      id: 1
    }
    this._section = this._section.bind(this)
    this._onClick = this._onClick.bind(this)
    this.saveParent = this.saveParent.bind(this)
  }

  componentWillMount() {
    var context = this
    axios.get('/api/profile/' + this.state.id,)
    .then(res => {
      var newState = Object.assign({}, this.state, res.data);
      context.setState(newState)
      console.log(context.state)
    })
    .catch(res => console.log(res))
  }

  _section() {
    switch(this.state.section) {
      case 'settings':
        return (<Settings info={Object.assign({}, this.state)} saveParent={this.saveParent} />);
        break;
      case 'personal':
        return (<PersonalInfo info={Object.assign({}, this.state)} saveParent={this.saveParent}/>);
        break;
      default:
        return null;
    }
  }

  _onClick(section) {
    this.setState({
      section: section
    })
  }

  saveParent(obj) {
    this.setState(obj)
  }

  render() {
    return (
      <div className="col-md-offset-2 col-md-8">
        <h2>
          Profile
        </h2>
        <div>
          <ul className="ul-profile col-md-3">
            <li onClick={() => {this._onClick('settings')}} className="profile-list"><h3>Settings</h3></li>
            <li onClick={() => {this._onClick('personal')}} className="profile-list"><h3>Personal Info</h3></li>
          </ul>
        </div>
        <div className="col-md-9">
          {this._section()}
        </div>
      </div>
    )
  }
}