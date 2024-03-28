import React from "react";
import { WiDayThunderstorm } from "weather-icons-react";

const DailyCard = (props) => {
  const dailyData = props.dailyData;
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  function formatTemp(temp) {
    if (props.country === "US") {
      return Math.round(((temp - 273.15) * 9) / 5 + 32);
    } else {
      return Math.round(temp - 273.15);
    }
  }

  let dayOfTheWeek;

  if (props.currentDay + props.index < 7) {
    dayOfTheWeek = days[props.currentDay + props.index];
  } else {
    dayOfTheWeek = days[props.currentDay + props.index - 7];
  }
  return (
    <div className={props.index === 0 ? "card current" : "card"}>
      <span className="title">{dayOfTheWeek}</span>
        <div className="icon"><WiDayThunderstorm /></div>
      <p className="max">{formatTemp(dailyData.temp.max)}&deg;</p>
      <p className="min">{formatTemp(dailyData.temp.min)}&deg;</p>
    </div>
  );
};

export default DailyCard;
