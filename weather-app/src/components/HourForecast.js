import React from "react";

export default function HourForecast(props){

    return(
        <div className={props.time === props.exactTime ? "hour-container hover" : "hour-container"}>
            <p>{props.time}</p>
            <div className="under-line"></div>
            <div className="weather-icon">
                <img src={props.icon} alt="weather-icon"></img>
            </div>
            <span>{props.temp + " °C"}</span>
        </div>
    )
}