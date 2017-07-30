import React, { Component } from 'react';
import { database } from './firebase'

class NewRestaurant extends Component {
  constructor(props){
    super(props);

    this.state = {
        name: ''
      };

      this.restaurantsRef = database.ref('/restaurants')
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.restaurantsRef.push({name: this.state.name})
  }

  render() {
    return (
      <div className='form-group'>
        <form onSubmit={this.handleSubmit}>
          <input
          className="form-control"
          id="formGroupExampleInput"
          type="text"
          value={this.state.value}
          placeholder="Enter a restaurant or everyone starves"
          onChange={(e)=> this.setState({name: e.target.value})}/>
        <input type='submit' className='btn btn-primary' />
        </form>
      </div>
    );
  }
}

export default NewRestaurant;
