import React, { Component } from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import axios from 'axios';

export class SignIn extends Component {
  constructor(props, context) {
    super(props, context);
  }

  responseFacebook (response, a) {
    console.log(response, a);
    //anything else you want to do(save to localStorage)...
    //TODO: Replace response.userId with the actual userId.
    axios.post(`/user?ID=${response.userId}`);
  }

  render() {
    return (
      <div>
        <FacebookLogin socialId="3888420283131154eaae86dcd03afe5e"
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