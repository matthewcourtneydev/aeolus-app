import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/home";
import Weather from "./components/weather";

function App() {
  const [weatherData, setCurrentWeatherData] = useState({});
  const [combinedWeatherData, setCombinedWeatherData] = useState({});
  const [cityFromLatAndLng, setCityFromLatAndLng] = useState(null);
  const [geoLocation, setGeoLocation] = useState({});
  const [isUsingCoords, setIsUsingCoords] = useState(true);
  const [currentDateInView, setCurrentDateInView] = useState(0);
  const [isNight, setIsNight] = useState(new Date().getHours() < 20);
  const navigate = useNavigate();
  const weatherApiKey = "2c7d687964a73c4c6ea30fce63c2f203";
  const googleApiKey = "AIzaSyD_NxJqkh3eKyTBEGdK8CZE-GsVj8BTOq0";

  function toggleIsUsingCoords() {
    setIsUsingCoords((prev) => {
      return !prev
    })
  }

  const date = new Date();

  const dateInfo = {
    currentDay: date.getDay(),
    month: formatMonth(date.getMonth()),
    day: formatDay(date.getDay()),
    hour: convertTime(date.getHours()),
    min: date.getMinutes(),
    hourMilitary: date.getHours()
  }


  function formatDay(dayCode) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayCode]
  }

  function formatMonth(monthCode) {
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
    return months[monthCode];
  }

  function convertTime(hours) {
    if (hours > 12) {
      return hours - 12;
    } else {
      return hours;
    }
  }

  function getUsersLocation() {
    if (isUsingCoords) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setGeoLocation({
            lat: lat,
            long: lng,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  } else {
    let cityInput = document.querySelector(".search-input").value;

    fetch (
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${weatherApiKey}`
    )
    .then((response) => response.json())
    .then((data) => setGeoLocation({lat: data.coord.lat, long: data.coord.lon}))
    .catch((error) => console.error(error));
  }
  }

  useEffect(() => {
    if (Object.keys(geoLocation).length > 0) {
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${geoLocation.lat}&lon=${geoLocation.long}&appid=${weatherApiKey}`
      )
        .then((response) => response.json())
        .then((data) => setCurrentWeatherData(data))
        .catch((error) => console.error(error));
    }
  }, [geoLocation]);

  useEffect(() => {
    if (Object.keys(weatherData).length > 0) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoLocation.lat},${geoLocation.long}&key=${googleApiKey}`
      )
        .then((response) => response.json())
        .then((data) => setCityFromLatAndLng(data))
        .catch((error) => console.error(error));
    }
  }, [weatherData]);

  useEffect(() => {
    if (cityFromLatAndLng) {
      const city = cityFromLatAndLng.results[0].address_components[3].long_name;
      fetch (
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`
      )
      .then((response) => response.json())
      .then((data) => setCombinedWeatherData({"currentWeather": weatherData, "cityWeather": data}))
      .catch((error) => console.error(error));
    }
  }, [cityFromLatAndLng]);


  useEffect(() => {
    if(Object.keys(combinedWeatherData).length > 0) {
      navigate("/weather")
    }
  }, [combinedWeatherData]);


  return (
    <div className="App">
      <Routes>
        <Route
          path={"/"}
          element={<Home setIsUsingCoords={toggleIsUsingCoords} isUsingCoords={isUsingCoords} getGeoLocation={getUsersLocation} />}
        />
        <Route
          path={"/weather"}
          element={
            <Weather currentDateInView={currentDateInView} setCurrentDateInView={setCurrentDateInView} isNightMode={isNight} dateInfo={dateInfo} cityInfo={cityFromLatAndLng} weatherData={combinedWeatherData} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
