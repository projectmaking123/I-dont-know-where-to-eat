import React, { Component } from 'react';
import { database } from './firebase';
import map from 'lodash/map';
import Restaurant from './Restaurant';

class Restaurants extends Component {
  handleSelect(key) {
      const currentUser = this.props.user;
      database.ref('/restaurants')
              .child(key)
              .child('votes')
              .child(currentUser.uid)
              .set(currentUser.displayName);
    }

    handleDeselect(key) {
      const currentUser = this.props.user;
      database.ref('/restaurants')
              .child(key)
              .child('votes')
              .child(currentUser.uid)
              .remove();
    }

  render () {
    const {user, restaurants} = this.props;
    return (
      <div className="col">
        {
          map(restaurants, (restaurant, key) =>
            <Restaurant
            key={key}
            {...restaurant}
            user={user}
            handleSelect={() => this.handleSelect(key)}
            handleDeselect={() => this.handleDeselect(key)}
            />
          )
        }
      </div>
    );
  }
}

export default Restaurants;
