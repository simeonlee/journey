import React, { Component } from 'react'
import { Button, Popover, Tooltip, Modal, OverlayTrigger } from 'react-bootstrap'

export class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
  }

  loginWithFacebook() {
    location.href='/auth/facebook';
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
            <Modal.Title className="login-modal-title">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              className="facebook-login-button"
              onClick={this.loginWithFacebook}
            >
              Login with Facebook
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};
