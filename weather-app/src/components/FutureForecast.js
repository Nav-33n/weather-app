import React from "react";

export default function FutureForecast({ dates, condition, icon, maxtemp, mintemp }) {
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="day-forecast">
      <div className="img-container">
        <img src={icon} alt={`Weather icon for ${condition}`} />
      </div>
      <div className="date-condition">
        <label>{getFormattedDate(dates)}</label>
        <p>{condition}</p>
      </div>
      <div className="f-temp">
        <span>{`${mintemp}°`}</span>
        <span>{`${maxtemp}°`}</span>
      </div>
    </div>
  );
}
