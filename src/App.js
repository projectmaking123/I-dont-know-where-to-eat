import React, {Component} from 'react';
import {auth, database} from './firebase';
import {BrowserRouter} from 'react-router-dom';
import Main from './Main';
import pick from 'lodash/pick';
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
                        <p>"this is the navbar"</p>
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
