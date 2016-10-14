import React, { Component } from 'react'
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel } from 'react-bootstrap'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form horizontal action="/signup" method="post">

        <FormGroup controlId="formHorizontalFullName">
          <Col sm={12}>
            <FormControl type="text" name="fullName" placeholder="Full Name" required="true" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col sm={12}>
            <FormControl type="email" name="email" placeholder="Email" required="true" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalUsername">
          <Col sm={12}>
            <FormControl type="text" name="username" placeholder="Username" required="true" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col sm={12}>
            <FormControl type="password" name="password" placeholder="Password" required="true" />
          </Col>
        </FormGroup>


        <FormGroup>
          <Col className="flex flex-right" sm={10}>
            <Checkbox className="remember-me-checkbox">Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col className="flex flex-center" sm={10}>
            <Button className="journey-btn journey-btn-primary journey-btn-xl" type="submit">
              Sign up
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
};
