import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import LoginModal from './LoginModal'
import axios from 'axios'

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logInOrOut: this.props.logInOrOut,
      showLoginModal: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.currentModalState = this.currentModalState.bind(this);
    this.logout = this.logout.bind(this);
  }

  // When the nav-bar renders, check if logged in.  If logged in,
  // render "Log Out" button, if not logged in, render ("Log In") button.
  componentDidMount() {
    axios.get('/auth')
      .then((res) => {
        if (!res.data) {
          this.setState({logInOrOut: 'Log In'});
        } else {
          this.setState({logInOrOut: 'Log Out'});
        }
      })
  }

  logout() {
    this.setState({logInOrOut: 'Log In'});
    axios.get('/logout');
  }

  closeModal() {
    this.setState({ showLoginModal: false });
  }

  openModal() {
    this.setState({ showLoginModal: true });
  }

  currentModalState() {
    return this.state.showLoginModal;
  }

  render() {

    //decides the function that the login / logout button will call.
    var cb;
    if (this.state.logInOrOut === 'Log Out') {
      cb = this.logout;
    } else {
      cb = this.openModal;
    }

    return (
      <div>
        <nav className="transparent white-background wrap navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="white-background navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="brand-centered">
              <IndexLink to="/" className="navbar-brand"><span className="logo">Journey</span></IndexLink>
            </div>
            <div className="navbar-collapse collapse" id="navigation">
              <ul className="nav navbar-nav navbar-left">
                <li><Link activeClassName="nav-active" to="/journal">Journal</Link></li>
                <li><Link activeClassName="nav-active" to="/dashboard">Dashboard</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link activeClassName="nav-active" to="/profile">Profile</Link></li>
                <li onClick={cb}><Link to="/">{this.state.logInOrOut}</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <LoginModal open={this.openModal} close={this.closeModal} currentState={this.currentModalState}/>
      </div>
    )
  }
}