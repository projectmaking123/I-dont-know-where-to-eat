import React, { Component } from 'react';
import Forecast from './Forecast';

class EventRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTemp: null
    }
    this.handleChildProps = this.handleChildProps.bind(this)
  }

  handleChildProps(temp) {
    this.setState({ currentTemp: temp })
  }

  render() {
    const { currentTemp } = this.state
    return (
      <div>
        <h1>Event Room</h1>
        <h1>Hello</h1>
        <Forecast handleChildProps={this.handleChildProps}/>
        {
          currentTemp &&
          <h1>
            {currentTemp}
          </h1>
        }
      </div>
    );
  }
}

export default EventRoom;
