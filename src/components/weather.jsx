import { useState, React } from "react";
import DailyCard from "./daily-card";
import Upper from "./upper";

const Weather = (props) => {
  console.log(props);
  const [currentWeather, setCurrentWeather] = useState(
    props.weatherData.currentWeather
  );
  const cityWeather = props.weatherData.cityWeather;
  const cityInfo = props.cityInfo.results[0].address_components;
  const dateInfo = props.dateInfo;

  return (
    <div className="weather">
      <Upper
        currentDateInView={props.currentDateInView}
        setCurrentDateInView={props.setCurrentDateInView}
        isNight={props.isNightMode}
        currentWeather={currentWeather}
        cityWeather={cityWeather}
        cityInfo={cityInfo}
        dateInfo={dateInfo}
      />
      <div className="lower">
        <span>7 Day Forecast</span>
        <div className="list">
          {currentWeather.daily.map((data, i) => {
            if (i < 7) {
              return (
                <DailyCard
                  country={cityWeather.sys.country}
                  index={i}
                  currentDay={dateInfo.currentDay}
                  dailyData={data}
                  currentDateInView={props.currentDateInView}
                  setCurrentDateInView={props.setCurrentDateInView}
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
