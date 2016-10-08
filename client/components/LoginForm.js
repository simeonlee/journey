import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel } from 'react-bootstrap'

export class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Form horizontal action="/login" method="post" className="login-form">

        <FormGroup controlId="formHorizontalUsername">
          <Col sm={10} className="col-sm-offset-1 login-field">
            <FormControl type="text" name="username" placeholder="Username" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col sm={10} className="col-sm-offset-1 login-field">
            <FormControl type="password" name="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={10}>
            <Button type="submit" className="col-sm-offset-10 local-login-button">
              Log In
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}