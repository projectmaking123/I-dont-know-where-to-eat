import React, {Component} from 'react';
import {auth} from './firebase';

class CurrentUser extends Component {
    render() {
        return (
            <div className="">
                <div className="">
                    <h1>
                        {this.props.currentUser.displayName}
                    </h1>
                    <div>
                        <h1>
                            Instructions
                        </h1>
                        <ul>
                            <li>Enter a restaurant or restaurants you would like to invite everyone to</li>
                            <li>Everyone then votes</li>
                            <li>The choice with the most votes wins</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentUser;
