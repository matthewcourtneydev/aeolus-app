import React from 'react';

const Weather = (props) => {
    return (
        <div className="weather">
            <h1>City: {props.currentCity}</h1>
            <h2>Country: {props.weatherData.sys.country}</h2>
        </div>
    );
}

export default Weather;
