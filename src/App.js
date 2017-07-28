import React, { Component } from 'react';
import SignIn from './SignIn';
import CurrentUser from './CurrentUser';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <SignIn />
        </div>
      </div>
    );
  }
}

export default App;
