import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Landing';
import EventRoom from './EventRoom';

class Main extends Component {
    render() {
        const {currentUser, restaurants} = this.props
        const FourOhFour = () => <h1>404</h1>;
        const LandingPage = (props) => {
            return (<Landing currentUser={currentUser} restaurants={restaurants}/>);
        }

        return (
            <div>
                <Switch>
                    <Route exact path='/' render={LandingPage}/>
                    <Route path='/eventroom' component={EventRoom}/>
                    <Route default component={FourOhFour}/>
                </Switch>
            </div>
        );
    }
}

export default Main;
