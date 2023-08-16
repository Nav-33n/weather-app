import React from "react";

export default function Wind(props){

    function getDirection(degree) {
        const directions = [
          'North', 'North-Northeast', 'Northeast', 'East-Northeast', 'East', 'East-Southeast',
          'Southeast', 'South-Southeast', 'South', 'South-Southwest', 'Southwest', 'West-Southwest',
          'West', 'West-Northwest', 'Northwest', 'North-Northwest', 'North'
        ];
      
        const index = Math.round(degree / 22.5);
        const directionIndex = (index % 16);
      
        return directions[directionIndex];
      }
      getDirection(props.direction)

    return(
        <div className="wind">
            <p><i class="fa-solid fa-wind"></i>{getDirection(props.direction)}, {props.speed + " Km/h"}</p>
        </div>
    )
}