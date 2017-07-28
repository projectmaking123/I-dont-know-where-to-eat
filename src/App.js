import React, { Component } from 'react';
import { auth } from './firebase'
import SignIn from './SignIn';
import CurrentUser from './CurrentUser';
import Space from './Space'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(currentUser => {
      this.setState({currentUser});
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          {
           !this.state.currentUser && <SignIn />
          }
          {
            this.state.currentUser && <CurrentUser currentUser={this.state.currentUser} />
          }
        </div>
      </div>
    );
  }
}

export default App;
