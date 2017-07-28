import React, { Component } from 'react';
import {  auth } from './firebase'

class CurrentUser extends Component {
  render() {
    return (
      <div className="">
        {this.props.currentUser.displayName}
        <button className="btn btn-primary" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default CurrentUser;
