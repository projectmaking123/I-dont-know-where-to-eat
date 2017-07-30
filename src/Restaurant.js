import React, { Component } from 'react';
import map from 'lodash/map';

class Restaurant extends Component {
  render () {
    const {name, user, votes, handleSelect, handleDeselect} = this.props;
    const userHasSelected = votes && Object.keys(votes).includes(user.uid);

    return (
      <article className="row">
        <h1 className="col"> {name} </h1>
        <div>
            { votes && map(votes, (vote, key) => <h4 key={key}> {vote} wants to go </h4>) }
        </div>
        {
          userHasSelected
          ? <button className="btn btn-danger center-block" onClick={handleDeselect}>
              Deselect
            </button>
          : <button className="btn btn-primary center-block" onClick={handleSelect}>
              Select
            </button>
        }
      </article>
    );
  }
}

export default Restaurant;
