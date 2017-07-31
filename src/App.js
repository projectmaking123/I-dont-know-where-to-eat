import React, {Component} from 'react';
import {auth, database} from './firebase'
import {BrowserRouter} from 'react-router-dom';
import Main from './Main';
import pick from 'lodash/pick';
import './App.css';
import map from 'lodash/map';
import ProfileCard from './ProfileCard'

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
                        <section>
                            {currentUser && map(users, (profile, uid) => {
                                if (currentUser.email === profile.email) {
                                    return <ProfileCard key={uid} {...profile} currentUser={currentUser} uid={uid}/>
                                }
                            })
                            }
                        </section>
                    </nav>
                    <div>
                        <Main currentUser={currentUser} restaurants={restaurants}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
