import React, { useEffect } from "react";
import Time from "./components/Time";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Degree from "./components/Degree";
import Wind from "./components/Wind";
import FutureText from "./components/FutureText";
import FutureForecast from "./components/FutureForecast";
import HourForecast from "./components/HourForecast";

export default function App() {
    
    const [wData, setWData] = React.useState(null)
   
    const [searchValue, setSearchValue] = React.useState("");

    const timeZoneoffset = Intl.DateTimeFormat().resolvedOptions().timeZone;

    function getValueAfterSlash(string) {
        const match = string.match(/\/([^/]+)$/);
        if (match) {
          return match[1];
        } else {
          return null;
        }
      }

    if(searchValue === ""){
        setSearchValue(getValueAfterSlash(timeZoneoffset))
    }

    function getSearch(sValue) {
        setSearchValue(sValue)
    }
    React.useEffect(()=> {
        async function weatherData() {

            try{
                const proxyUrl = `https://nabin-weather-api.onrender.com/forecast?city=${encodeURIComponent(`${searchValue}`)}`

            const response = await fetch(proxyUrl, {
                method: 'GET'
            });
            const data = await response.json();
             setWData(data);
    } catch (error) {
                console.error('An error occurred:', error);
            }
        }
        weatherData();

    }, [searchValue])

    if(wData == null){
        return <div>Loading...</div>
    }


    let forecastData = []

    wData.forecast.forecastday.map((day) => {
        forecastData.push({date: day.date, text: day.day.condition.text, icon: day.day.condition.icon, maxtemp: Math.round(day.day.maxtemp_c), mintemp: Math.round(day.day.mintemp_c)})
    })

    let hourlyForecast = [];

    function extractTime(dateTimeString) {
        const [datePart, timePart] = dateTimeString.split(' ');
        const [hours, minutes] = timePart.split(':');
        const time = hours + ':' + minutes;
        
        return time;
      }

      function roundTimeToHour(time) {
        const [hours, minutes] = time.split(':');
        const roundedHours = Math.floor(+hours + (+minutes / 60));
        
        return `${roundedHours.toString().padStart(2, '0')}:00`;
      }

    wData.forecast.forecastday[0].hour.map((hours) => {
        hourlyForecast.push({time: extractTime(hours.time), temp: Math.round(hours.temp_c), img: hours.condition.icon})
    })

    let eightTime = [];
    
    const time = roundTimeToHour(extractTime(wData.current.last_updated));

    function divideArrayIntoParts(array) {
        const partSize = Math.ceil(array.length / 3); // Calculate the size of each part
      
        const dividedArray = [];
        for (let i = 0; i < array.length; i += partSize) {
          const part = array.slice(i, i + partSize); // Extract a part of the array
          dividedArray.push(part); // Add the part to the dividedArray
        }
      
        return dividedArray;
      }

    eightTime = divideArrayIntoParts(hourlyForecast);

    function passArray(array) {
        let passAnArray = [];
        if(time === "00:00" || time === "01:00" || time === "02:00" || time === "03:00" || time === "04:00"
          || time === "05:00" || time === "06:00" || time === "07:00") {
             passAnArray.push(array[0])
          } 
          else if(time === "08:00" || time === "09:00" || time === "10:00" || time === "11:00" || time === "12:00" || time === "13:00" || time === "14:00" ||
                    time === "15:00") {
                        passAnArray.push(array[1])
                    } 
                    else if(time === "16:00" || time === "17:00" || time === "18:00" || time === "19:00" || time === "20:00" || time === "21:00" || time === "22:00" || time === "23:00"){
                        passAnArray.push(array[2])
                    }
        return passAnArray;
    }

    const hourForecast = passArray(eightTime)

    const forecastElements = forecastData.map((forecast) => {
        return(
            <FutureForecast
            dates={forecast.date}
            condition={forecast.text}
            icon={forecast.icon}
            maxtemp={forecast.maxtemp}
            mintemp={forecast.mintemp}/>
        )
    })
  
    const hourForecastElements = hourForecast[0].map((hourly) =>{
        return (
            <HourForecast 
                time={hourly.time}
                icon={hourly.img}
                temp={hourly.temp}
                exactTime={time}
            />
        )
    })

    return (
        <div className="main-container">
            <div className="left-container">
            <Time 
                timezone={wData.location.tz_id}
                />
            <CurrentWeather
                condition={wData.current.condition.text}
                />
                <div className="underline1"></div>
            <div className="hour-forecast">
                {hourForecastElements}
            </div>
            </div>
            <div className="right-container">
            <Search 
            place={wData.location.name}
            region={wData.location.region}
            country={wData.location.country}
            search={getSearch}/>
            <Degree
            celcius={wData.current.temp_c}/>
            <Wind
            speed={wData.current.wind_kph}
            direction={wData.current.wind_degree}/>
            <div className="underline"></div>
                <FutureText/>
                <div className="future-forecast">
                {forecastElements}
                </div>
            </div>
        </div>
    )
}