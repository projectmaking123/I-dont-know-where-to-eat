import React, { Component } from 'react';
import { googleAuthProvider, auth } from './firebase'

class SignIn extends Component {
  render() {
    return (
        <button className="btn btn-primary" onClick={() =>auth.signInWithPopup(googleAuthProvider)}>
          Sign In
        </button>
    );
  }
}

export default SignIn;
