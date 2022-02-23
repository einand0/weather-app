import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);    

  let getWeather = async (lat, long) => {

    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    console.log(res);
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])


  if (location === false) {
    return (
      <Fragment>
        Você precisa habilitar a sua localização no browser! :(
      </Fragment>
    )

  } else if (weather === false) {

    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )

  } else {

    return (

      <div className="container">


        <div className="city-weather card">
          <h1>{weather['name']}</h1>
          <div className="weather-data">
            <h2>{weather['main']['temp']}ºC</h2>
            <img id="img-termostato" src="https://irimiaionut.github.io/Animated-Icons-SVG/resources/weather/termo.svg" alt="temorstato"></img>
          </div>
          <h2>{weather['weather'][0]['description']}</h2>
        </div>


        <div className="max-temperature card">
          <span>Temperatura Máx.</span>
          <h3>
            {weather['main']['temp_max']}ºC
            <i className="bi bi-arrow-up" style={{ color: 'green' }}></i>
          </h3>
        </div>

        <div className="min-temperature card">
          <span>Temperatura Min.</span>
          <h3>
            <p>{weather['main']['temp_min']}ºC</p>
            <i className="bi bi-arrow-down" style={{ color: 'red' }}></i>
          </h3>
        </div>

        <div className="pressure card">
          <span>Pressão</span>
          <h3>
            {weather['main']['pressure']} hpa
            <i className="bi bi-compass" style={{ color: 'black' }} ></i>
          </h3>
        </div>

        <div className="humidity card">
          <span>Umidade</span>
          <h3>
            {weather['main']['humidity']}%
            <i className="bi bi-droplet" style={{ color: 'cornflowerblue' }}></i>
          </h3>
        </div>

      </div>

    );
  }
}

export default App;
