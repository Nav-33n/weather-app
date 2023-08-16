import React from "react";

export default function FutureForecast(props) {

    function getDayMonthAndDate(dateString) {
        
        const date = new Date(dateString);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options);
  
        return formattedDate;
      }

    return(
            <div className="day-forecast">
                <div className="img-container">
                <img src={props.icon} alt="weather-icon"></img>
                </div>
                <div className="date-condition">
                    <label>{getDayMonthAndDate(props.dates)}</label>
                    <p>{props.condition}</p>
                </div>
                <div className="f-temp">
                    <span>{props.mintemp + "°"}</span>
                    <span>{props.maxtemp + "°"}</span>
                </div>
            </div>
    )
}