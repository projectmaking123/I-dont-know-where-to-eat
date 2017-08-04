import React, {Component} from 'react';
import {auth, database, googleAuthProvider} from './firebase';
import {BrowserRouter} from 'react-router-dom';
import Main from './Main';
import pick from 'lodash/pick';
import './styles/App.css';

import map from 'lodash/map';
import ProfileCard from './ProfileCard';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.usersRef = null;
        this.userRef = null;

        this.state = {
            currentUser: null,
            restaurants: null,
            users: {}
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((currentUser) => {
            this.setState({currentUser});
            this.usersRef = database.ref('/users');

            if (currentUser) {
                this.userRef = this.usersRef.child(currentUser.uid);

                this.userRef.once('value').then((snapshot) => {
                    if (snapshot.val())
                        return;
                    const userInfo = pick(currentUser, ['displayName', 'photoURL', 'email']);
                    this.userRef.set(userInfo);
                });
            }

            this.usersRef.on('value', (snapshot) => {
                this.setState({users: snapshot.val()});
            });
        });

        database.ref('/restaurants/').on('value', (snapshot) => {
            this.setState({restaurants: snapshot.val()})
        })
    }



    render() {
        const {currentUser, users, restaurants} = this.state


        return (
            <BrowserRouter key={Math.random()}>
                <div className="container-fluid">
                    <nav className="navbar navbar-light" >

                        <button className="btn btn-primary">
                            <a style={{
                                color: 'white'
                            }} href="/">Home</a>
                        </button>
                        <button className="btn btn-primary">
                            <a style={{
                                color: 'white'
                            }} href="/eventroom" title="Events">events</a>
                        </button>
                        {
                            currentUser
                            ? <button className="btn btn-primary" id="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
                            : <button className="btn btn-primary" id="sign-in" onClick={() => auth.signInWithPopup(googleAuthProvider)}>Sign In</button>
                        }
                    </nav>
                    <div className="perofile-wrapper">

                    </div>
                    <div>
                        <Main currentUser={currentUser} restaurants={restaurants} users={users}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
