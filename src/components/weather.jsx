import React from "react";
import DailyCard from "./daily-card";
import { FaLocationDot } from "react-icons/fa6";
import { IoUmbrella } from "react-icons/io5";
import { ImDroplet } from "react-icons/im";
import { FiWind } from "react-icons/fi";

const Weather = (props) => {
  console.log(props);
  const currentWeather = props.weatherData.currentWeather;
  const cityWeather = props.weatherData.cityWeather;
  const cityInfo = props.cityInfo.results[0].address_components;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(cityInfo);

  const imgString = `./imgs/${currentWeather.current.weather[0].main}.png`;

  const date = new Date();
  const currentDay = date.getDay();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const min = date.getMinutes();

  function formatTemp(temp) {
    if (cityWeather.sys.country === "US") {
      return Math.round(((temp - 273.15) * 9) / 5 + 32);
    } else {
      return Math.round(temp - 273.15);
    }
  }

  function convertSpeed(speed) {
    if (cityWeather.sys.country === "US") {
      return Math.round(speed * 2.2369362921);
    } else {
      return Math.round(speed * 3.6);
    }
  }

  function convertTime(hours) {
    if (hours > 12) {
      return hours - 12;
    } else {
      return hours;
    }
  }

  return (
    <div className="weather">
      <div className="upper">
        <p className="location-name">
          <span>
            <FaLocationDot />
          </span>{" "}
          {cityWeather.name}, {cityInfo[5].short_name}
        </p>
        <p className="date">
          {days[currentDay]}, {day} {months[month]} {convertTime(hour)}:
          {min.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}{" "}
          {hour > 12 ? "PM" : "AM"}
        </p>
        {/* <h2>Country: {cityWeather.sys.country}</h2>
            <h2>Temp: {formatTemp(currentWeather.current.temp)}&deg;</h2> */}
        <div className="weather-container">
          <h1 className="temp">
            {formatTemp(currentWeather.current.temp)}
            <span>&deg;</span>
          </h1>
          <div className="desc-container">
            <h2>{currentWeather.current.weather[0].main}</h2>
            <img src={imgString} alt="" />
          </div>
        </div>

        <div className="extra-info">
          <div className="inner">
            <div className="info-el">
              <span>
                <IoUmbrella />
              </span>
              <p className="info-data-item">0%</p>
              <p className="info-item-desc">Preciptiation</p>
            </div>
            <div className="info-el">
              <span>
                <ImDroplet />
              </span>
              <p className="info-data-item">
                {currentWeather.current.humidity}%
              </p>
              <p className="info-item-desc">Humidity</p>
            </div>
            <div className="info-el">
              <span>
                <FiWind />
              </span>
              <p className="info-data-item">{`${convertSpeed(
                currentWeather.current.wind_speed
              )} ${cityWeather.sys.country === "US" ? "mph" : "km/h"}`}</p>
              <p className="info-item-desc">Wind Speed</p>
            </div>
          </div>
        </div>
        <div className="chart">
          <span>UV Index</span>
          <figure className="css-chart">
            <ul className="line-chart">
              {currentWeather.hourly.map((hourlyData, i) => {
                if (i < 10) {
                  return (
                    <li>
                      <div
                        className="data-point"
                        data-value={hourlyData.uvi}
                        style={{
                          bottom: (hourlyData.uvi / 10) * 120 + "px",
                          left: i * 10 + "%",
                        }}
                      ></div>
                    </li>
                  );
                }
              })}
            </ul>
          </figure>
        </div>
      </div>

      <div className="lower">
        <span>7 Day Forecast</span>
        <div className="list">
          {currentWeather.daily.map((data, i) => {
            if (i < 8) {
              return (
                <DailyCard
                  country={cityWeather.sys.country}
                  index={i}
                  currentDay={currentDay}
                  dailyData={data}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Weather;
