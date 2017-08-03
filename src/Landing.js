import React, { Component } from 'react';
import SignIn from './SignIn';
import Restaurants from './Restaurants';
import NewRestaurant from './NewRestaurant';
import EventRoom from './EventRoom';

class Landing extends Component {
  
  render() {
    const { currentUser, restaurants } = this.props
    return (
      <div className="">
        <div className="row">
            <div className='food-image col'>
            </div>
        </div>
        <div className='row'>
          <div className="">
            {
             !currentUser && <SignIn />
            }
          </div>
          <div className="col-6">
            {
              currentUser &&
              <div>
                <NewRestaurant />
                <Restaurants restaurants={restaurants} user={currentUser}/>
              </div>
            }
            <div className="">
              <div className="row">
                <div className="col-md-6 brunch">
                </div>
                <div className="col-md-6 fruits">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
