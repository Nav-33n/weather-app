import React from "react";

export default function Degree(props){
    return(
        <div className="degree">
            <span>{Math.round(props.celcius) + " °C"}</span>
        </div>
    )
}