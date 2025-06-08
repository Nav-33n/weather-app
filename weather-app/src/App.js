import React, { useEffect, useState, useMemo } from "react";
import Time from "./components/Time";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Degree from "./components/Degree";
import Wind from "./components/Wind";
import FutureText from "./components/FutureText";
import FutureForecast from "./components/FutureForecast";
import HourForecast from "./components/HourForecast";

export default function App() {
  const [wData, setWData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Set default search value based on timezone
  useEffect(() => {
    if (!searchValue) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const match = timeZone.match(/\/([^/]+)$/);
      setSearchValue(match ? match[1] : "London");
    }
  }, [searchValue]);

  console.log("Search Value:", searchValue);
  // Fetch weather data when searchValue changes
  useEffect(() => {
    if (!searchValue) return;

    const fetchWeatherData = async () => {
      try {
        const url = `${baseUrl}?city=${encodeURIComponent(searchValue)}`;
        const response = await fetch(url);

         if (!response.ok) {
      throw new Error("City not found"); }

        const data = await response.json();
        setWData(data);
        setError(null);

      } catch (error) {
        setError("Oops! City not found.");
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeatherData();
  }, [searchValue]);

  // Compute current time only when data is available
  const currentTime = useMemo(() => {
    if (!wData || !wData.current) return "";
    const lastUpdated = wData.current.last_updated;
    const [, timePart] = lastUpdated.split(' ');
    const [hours, minutes] = timePart.split(':');
    const roundedHours = Math.floor(+hours + (+minutes / 60));
    return `${roundedHours.toString().padStart(2, '0')}:00`;
  }, [wData]);
  
  // Prepare hourly forecast even before data is loaded
  const hourlyForecast = useMemo(() => {
    if (!wData || !wData.forecast?.forecastday?.[0]?.hour) return [];
    return wData.forecast.forecastday[0].hour.map(hour => ({
      time: hour.time.split(" ")[1].slice(0, 5),
      temp: Math.round(hour.temp_c),
      img: hour.condition.icon
    }));
  }, [wData]);

  // Group the hourly data into 3 time parts
  const timeGroups = useMemo(() => {
    const size = Math.ceil(hourlyForecast.length / 3) || 1;
    return [
      hourlyForecast.slice(0, size),
      hourlyForecast.slice(size, size * 2),
      hourlyForecast.slice(size * 2)
    ];
  }, [hourlyForecast]);

  // Select one group based on currentTime
  const hourForecast = useMemo(() => {
    const hour = parseInt(currentTime.split(":")[0]);
    if (hour < 8) return timeGroups[0];
    if (hour < 16) return timeGroups[1];
    return timeGroups[2];
  }, [currentTime, timeGroups]);

  // Loading screen
  if (!wData) return <div>Loading...</div>;

  // Prepare 3-day forecast
  const forecastData = wData.forecast.forecastday.map((day) => ({
    date: day.date,
    text: day.day.condition.text,
    icon: day.day.condition.icon,
    maxtemp: Math.round(day.day.maxtemp_c),
    mintemp: Math.round(day.day.mintemp_c)
  }));

  return (
    <div className="main-container">
      <div className="left-container">
        <Time timezone={wData.location.tz_id} />
        <CurrentWeather condition={wData.current.condition.text} />
        <div className="underline1"></div>
        <div className="hour-forecast">
          {hourForecast.map((hour, idx) => (
            <HourForecast
              key={idx}
              time={hour.time}
              icon={hour.img}
              temp={hour.temp}
              exactTime={currentTime}
            />
          ))}
        </div>
      </div>

      <div className="right-container">
        {error && <p className="error-message">{error}</p>}
        <Search
          place={wData.location.name}
          region={wData.location.region}
          country={wData.location.country}
          search={setSearchValue}
        />
        <Degree celcius={wData.current.temp_c} />
        <Wind
          speed={wData.current.wind_kph}
          direction={wData.current.wind_degree}
        />
        <div className="underline"></div>
        <FutureText />
        <div className="future-forecast">
          {forecastData.map((f, idx) => (
            <FutureForecast
              key={idx}
              dates={f.date}
              condition={f.text}
              icon={f.icon}
              maxtemp={f.maxtemp}
              mintemp={f.mintemp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
