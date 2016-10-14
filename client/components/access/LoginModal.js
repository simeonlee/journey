import React, { Component } from 'react'
import { Button, Popover, Tooltip, Modal, OverlayTrigger } from 'react-bootstrap'
import { LoginForm } from './LoginForm.js'
import axios from 'axios'

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithAmazon = this.loginWithAmazon.bind(this);
  }

  loginWithFacebook() {
    location.href='/auth/facebook';
  }

  loginWithAmazon() {
    location.href='/auth/Amazon';
  }

  render() {
    var showModal = this.props.currentState();
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <Modal className="login-modal" show={showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title className="login-modal-title">Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm/>
            <hr/>
            <div className="modal-btn-section">
              <div
                className="journey-btn journey-btn-auth journey-btn-facebook"
                onClick={this.loginWithFacebook}
              >
                Log in with Facebook
              </div>
              <div
                className="journey-btn journey-btn-auth journey-btn-amazon amazon-bumper"
                onClick={this.loginWithAmazon}
              >
                Log in with Amazon
              </div>
            </div>
          </Modal.Body>
          <hr className="login-last-break"/>
        </Modal>
      </div>
    );
  }
};
