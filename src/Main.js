import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Landing';
import EventRoom from './EventRoom';
import ProfilePage from './ProfilePage';

class Main extends Component {
    render() {
        const {currentUser, restaurants, users} = this.props
        const FourOhFour = () => <h1>404</h1>;
        const LandingPage = (props) => {
            return (<Landing currentUser={currentUser} restaurants={restaurants}/>);
        }

        const UserPage = (props) => {
            return (<ProfilePage currentUser={currentUser} restaurants={restaurants} users={users}/>);
        }

        return (
            <Switch>
                <Route exact path='/' render={LandingPage}/>
                <Route path='/user' render={UserPage}/>
                <Route path='/eventroom' component={EventRoom}/>
                <Route default component={FourOhFour}/>
            </Switch>
        );
    }
}

export default Main;
