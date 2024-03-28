import React from "react";
import { useRef } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import partialCloud from "../imgs/partially-cloudy.webp";

const Home = (props) => {
  function onSubmit() {
    props.getGeoLocation();
  }
  return (
    <div className="home">
      <img src={partialCloud} alt="cloud" />
      <div className="shadow"></div>

      <h1>
        <strong>Weather</strong> Forecasts
      </h1>
      <div className="wrapper">
        <button className="get-started" onClick={() => onSubmit()}>
          Get Started
        </button>
        <a href="#">Or click here to choose a city</a>
      </div>
    </div>
  );
};

export default Home;
