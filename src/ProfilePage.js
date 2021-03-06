import React, {Component} from 'react';
import ProfileCard from './ProfileCard'
import map from 'lodash/map';

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            restaurants: null,
            users: {}
        };
    }
    componentDidMount() {
        const { currentUser, users } = this.props
        this.setState({ currentUser, users })
    }

    render() {
        const {currentUser, users, restaurants} = this.state
        const FourOhFour = () => <h1>404</h1>;
        return (
            <div className="profile_page_wrapper img-responsive group-meal">
                {
                    currentUser && map(users, (profile, uid) => {
                        if (currentUser.email === profile.email) {
                            return <ProfileCard key={uid} {...profile} currentUser={currentUser} uid={uid}/>
                        } else {
                            {FourOhFour}
                        }
                    })
                }
            </div>
        );
    }
}

export default ProfilePage;
