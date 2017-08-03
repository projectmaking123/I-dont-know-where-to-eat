import React, { Component } from 'react';
import axios from 'axios';

class Forecast extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: '',
      lng: '',
      value: 'Enter city',
      currentTemp: null,
      weeklyTemp: null
    }

    this.handleForecastApi = this.handleForecastApi.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleGeoMapApi = this.handleGeoMapApi.bind(this)
    this.handleInputClick = this.handleInputClick.bind(this)
    this.sendUpProps = this.sendUpProps.bind(this)
  }

  handleGeoMapApi(event) {
    event.preventDefault();
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.value}&sensor=true`)
    .then(response => {
      this.setState({
        lat: response.data.results[0].geometry.location.lat,
        lng: response.data.results[0].geometry.location.lng
      })
      this.handleForecastApi();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleForecastApi() {
    axios.get(`https://forecast-api-projectmaking123.herokuapp.com/${this.state.lat}/${this.state.lng}`)
    .then(response => {
      this.setState({
        currentTemp: response.data.currently.apparentTemperature,
        weeklyTemp: response.data.daily.data
       })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  sendUpProps(){
    this.props.handleChildProps(this.state.currentTemp)
  }

  handleChange(e) {
    this.setState({ value: e.target.value})
  }

  handleInputClick() {
    this.setState({ value: '' })
  }

  render() {
    const { currentTemp, value, weeklyTemp } = this.state
    const today = new Date()
    return (
      <div className="">
          <form className="form-group" onSubmit={this.handleGeoMapApi}>
            <input className="form-control" value={this.state.value} onChange={this.handleChange} onClick={this.handleInputClick}/>
            <button className="btn btn-primary" type="submit"> Submit </button>
          </form>
          <div className="col-md-2 col-md-offset-5">
            {
              currentTemp &&
              <p>The Current Temperature in {value} is {currentTemp}</p>
            }
          </div>

            <div style={{marginTop: '15%'}} className="container-fluid">
              <div className='row'>
              {
                weeklyTemp &&
                weeklyTemp.slice(1, weeklyTemp.length-1).map((temp, key) =>
                  {
                    if(temp.icon === 'partly-cloudy-day') {
                      return <p key={key} className="col-md-2">
                        { today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (parseInt(today.getDate()) + key).toString()}
                        <br></br>
                        {temp.apparentTemperatureMax}
                        <br></br>
                        <i className={`wi-day-cloudy`}></i>
                      </p>
                      } else {
                        return <p key={key} className="col-md-2">
                          { today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (parseInt(today.getDate()) + key).toString()}
                          <br></br>
                          {temp.apparentTemperatureMax}
                          <br></br>
                          <i className={`wi-${temp.icon}`}></i>
                        </p>
                    }
                  }
                )
              }
            </div>
            <button onClick={this.sendUpProps}>
              hello
            </button>
          </div>
      </div>
    );
  }
}

export default Forecast;
