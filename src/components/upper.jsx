import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoUmbrella } from "react-icons/io5";
import { ImDroplet } from "react-icons/im";
import { FiWind } from "react-icons/fi";

const Upper = (props) => {
  const currentWeather = (props.currentDateInView > 0 ? props.currentWeather.daily[props.currentDateInView] : props.currentWeather);
  const cityWeather = props.cityWeather;
  const cityInfo = props.cityInfo;
  const dateInfo = props.dateInfo;
  const isNight = props.isNight;

  console.log(currentWeather);

  const imgString = `./imgs/${isNight ? "day" : "night"}/${
    (props.currentDateInView > 0 ? currentWeather.weather[0].main : currentWeather.current.weather[0].main)
  }.png`;

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

  return (
    <div className="upper">
      <p className="location-name">
        <span>
          <FaLocationDot />
        </span>{" "}
        {cityWeather.name}, {cityInfo[5].short_name}
      </p>
      <p className="date">
        {dateInfo.day}, {dateInfo.currentDay} {dateInfo.month} {dateInfo.hour}:
        {dateInfo.min.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}{" "}
        {dateInfo.hourMilitary > 12 ? "PM" : "AM"}
      </p>
      <div className="weather-container">
        <h1 className="temp">
          {(props.currentDateInView > 0 ? formatTemp(currentWeather.temp.day) : formatTemp(currentWeather.current.temp))}
          <span>&deg;</span>
        </h1>
        <div className="desc-container">
          <h2>{(props.currentDateInView > 0 ? currentWeather.weather[0].main : currentWeather.current.weather[0].main)}</h2>
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
            <p className="info-data-item">{props.currentDateInView > 0 ? currentWeather.humidity : currentWeather.current.humidity}%</p>
            <p className="info-item-desc">Humidity</p>
          </div>
          <div className="info-el">
            <span>
              <FiWind />
            </span>
            <p className="info-data-item">{`${convertSpeed(
              props.currentDateInView > 0 ? currentWeather.wind_speed : currentWeather.current.wind_speed
            )} ${cityWeather.sys.country === "US" ? "mph" : "km/h"}`}</p>
            <p className="info-item-desc">Wind Speed</p>
          </div>
        </div>
      </div>
      <div className="chart">
        <span>UV Index</span>
        {props.currentDateInView > 0 ? <></> :           <figure className="css-chart">
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
          </figure>}
      </div>
    </div>
  );
};

export default Upper;
