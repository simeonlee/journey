import React, { Component } from 'react'
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel } from 'react-bootstrap'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form horizontal>

        <FormGroup controlId="formHorizontalFullName">
          <Col sm={12}>
            <FormControl type="text" placeholder="Full Name" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col sm={12}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalUsername">
          <Col sm={12}>
            <FormControl type="text" placeholder="Username" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col sm={12}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>


        <FormGroup>
          <Col sm={10}>
            <Checkbox className="remember-me-checkbox">Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={10}>
            <Button type="submit">
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
};
