import React, { Component } from 'react';
import { FacebookLogin } from 'react-facebook-login-component';

export class SignIn extends Component {
  constructor(props, context) {
    super(props, context);
  }

  responseFacebook (response, a) {
    console.log(response, a);
    //anything else you want to do(save to localStorage)...
  }

  render() {
    return (
      <div>
        <FacebookLogin socialId="375795929474685"
                       language="en_US"
                       scope="public_profile,email"
                       responseHandler={this.responseFacebook}
                       xfbml={true}
                       version="v2.5"
                       class="facebook-login"
                       buttonText="Login With Facebook"/>
      </div>
    )
  }
}