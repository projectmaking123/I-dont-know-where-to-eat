import React, {Component} from 'react';
import {auth, database, googleAuthProvider} from './firebase';
import {BrowserRouter} from 'react-router-dom';
import Main from './Main';
import pick from 'lodash/pick';
import './styles/App.css';

import map from 'lodash/map';
import ProfileCard from './ProfileCard';


class App extends Component {
    constructor(props) {
        super(props);
        this.usersRef = null;
        this.userRef = null;

        this.state = {
            currentUser: null,
            restaurants: null,
            users: {},
            showInstructions: false
        };
        this.toggleInstructions = this.toggleInstructions.bind(this)
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

    toggleInstructions() {
        this.setState(prevState => ({
            showInstructions: !prevState.showInstructions
        }));
    }

    render() {
        const {currentUser, users, restaurants} = this.state
        return (
            <BrowserRouter key={Math.random()}>
                <div className="">
                    <nav className="navbar" >

                        <button className="btn btn-primary nav_btn"><a href="/">Home</a></button>
                        <button className="btn btn-primary nav_btn"><a href="/eventroom" title="Events">events</a></button>
                        {
                            currentUser
                            ? <button className="btn btn-primary nav_btn" id="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
                            : <button className="btn btn-primary nav_btn" id="sign-in" onClick={() => auth.signInWithPopup(googleAuthProvider)}>Sign In</button>
                        }
                        <button className="info_btn nav_btn" onClick={this.toggleInstructions}>?</button>
                        <div className={"info_instructions " + (this.state.showInstructions ? "show_instruction" : "hide_instruction")}>
                            <h1>
                                Instructions
                            </h1>
                            <ul>
                                <li>Enter a restaurant or restaurants you would like to invite everyone to</li>
                                <li>Everyone then votes</li>
                                <li>The choice with the most votes wins</li>
                            </ul>
                        </div>
                    </nav>


                    <Main currentUser={currentUser} restaurants={restaurants} users={users}/>

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
