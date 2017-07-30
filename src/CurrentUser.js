import React, { Component } from 'react';
import { auth } from './firebase';

class CurrentUser extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-6 col-sm-3">
          <h1>
            {this.props.currentUser.displayName}
          </h1>
          <button className="btn btn-primary" id="sign-out" onClick={() => auth.signOut()}>
            Sign Out
          </button>
          <div>
            <h1>
              Instructions
            </h1>
            <ul>
              <li>Enter a restaurant or restaurants you would like to invite everyone to</li>
              <li>Everyone then votes</li>
              <li>The choice with the most votes wins</li>
            </ul>
            <button className="btn btn-primary">
              <a style={{color: 'white'}} href="/">Home</a>
            </button>
            <button className="btn btn-primary">
              <a style={{color: 'white'}} href="/eventroom" title="Events">events</a>
            </button>
          </div>
        </div>
        <div className="col-xs-6 col-sm-3 img-responsive group-meal">
        </div>
      </div>
    );
  }
}

export default CurrentUser;
