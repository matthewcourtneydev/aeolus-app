import React from "react";
import { useRef } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Search from "./search";
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
      <Search onSubmit={onSubmit} setIsUsingCoords={props.setIsUsingCoords} isUsingCoords={props.isUsingCoords} />
    </div>
  );
};

export default Home;
