import React from 'react';

const Weather = (props) => {
    console.log(props)
    const currentWeather = props.weatherData.currentWeather;
    const cityWeather = props.weatherData.cityWeather;
    return (
        <div className="weather">
            <h1>City: {cityWeather.name}</h1>
            <h2>Country: {cityWeather.sys.country}</h2>
        </div>
    );
}

export default Weather;
