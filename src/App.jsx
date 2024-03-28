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
  const navigate = useNavigate();
  const weatherApiKey = "2c7d687964a73c4c6ea30fce63c2f203";
  const googleApiKey = "AIzaSyD_NxJqkh3eKyTBEGdK8CZE-GsVj8BTOq0"


  function getUsersLocation() {
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
      debugger;
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
  }, [combinedWeatherData])
  return (
    <div className="App">
      <Routes>
        <Route
          path={"/"}
          element={<Home getGeoLocation={getUsersLocation} />}
        />
        <Route
          path={"/weather"}
          element={
            <Weather cityInfo={cityFromLatAndLng} weatherData={combinedWeatherData} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
