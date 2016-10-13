import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'
import LoginModal from './access/LoginModal'
import SignUp from './access/SignUp'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.currentModalState = this.currentModalState.bind(this);
  }

  openModal() {
    this.setState({ showLoginModal: true });
  }

  closeModal() {
    this.setState({ showLoginModal: false });
  }

  currentModalState() {
    return this.state.showLoginModal;
  }

  render() {
    return (
      <div>
        <div className="home-main-image home-banner">
          <Button onClick={this.openModal} className="home-login-button" bsSize="small">Log In</Button>
          <h1 className="home-title">Journey</h1>
          <p className="home-slogan">Uncage the mind.</p>
          <div className="home-signup-form">
            <h1 className="home-section-title">Sign up</h1>
            <SignUp className="col-md-4 col-md-offset-3"/>
          </div>
        </div>
        <LoginModal open={this.openModal} close={this.closeModal} currentState={this.currentModalState}/>
      </div>
    )
  }
}

/*
<Jumbotron className="home-jumbotron jumbo-first">
  <h2 className="col-md-offset-1 col-md-4 jumbo-left-text">Wellbeing, <br/>&#9;  Mental Health</h2>
  <p className="col-md-offset-1">Ensure your wellbeing and happiness with real, quantifiable results.</p>
</Jumbotron>
<Jumbotron className="home-jumbotron">
  <p className="col-md-offset-1 col-md-7">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  <h1 className="col-md-offset-1 jumbo-right-text">Sign Up!</h1>
</Jumbotron>
<Jumbotron className="home-jumbotron">
  <h2 className="col-md-offset-1 col-md-4 left-jumbo-1">Double check your <br/> Mental Health</h2>
  <p className="col-md-offset-1">See rich visualizations of your previous entries.  We analyze your posts and offer feedback on your current mental health!</p>
</Jumbotron>
<Jumbotron className="home-jumbotron">
  <p className="col-md-offset-1 col-md-7">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  <h1 className="col-md-offset-1 jumbo-right-text">Journey</h1>
</Jumbotron>
*/