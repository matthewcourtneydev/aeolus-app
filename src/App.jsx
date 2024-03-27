import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/home";
import Weather from "./components/weather";

function App() {
  const [currentLocation, setCurrentLocation] = useState("");
  const [weatherData, setCurrentWeatherData] = useState({});
  const navigate = useNavigate();
  const apiKey = "2c7d687964a73c4c6ea30fce63c2f203";

  function logSearchResult(searchInput) {
    setCurrentLocation(searchInput);
  }

  useEffect(() => {
    console.log(currentLocation);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setCurrentWeatherData(data))
      .catch((error) => console.error(error));
    navigate("/weather")
  }, [currentLocation]);

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home searchFunction={logSearchResult} />} />
        <Route
          path={"/weather"}
          element={<Weather currentCity={currentLocation} weatherData={weatherData} />}
        />
      </Routes>
    </div>
  );
}

export default App;
