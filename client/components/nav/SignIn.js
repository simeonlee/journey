import React, { Component } from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import axios from 'axios';

export default class SignIn extends Component {
  constructor(props, context) {
    super(props, context);
  }

  responseFacebook (response, a) {
    console.log('response', response, a);
    //anything else you want to do(save to localStorage)...
    //TODO: Replace response.userId with the actual userId.
    axios.post(`/user?ID=${response}`);
  }

  render() {
    return (
      <div>
        <a href="/auth/facebook">Login with Facebook</a>
      </div>
    )
  }
}