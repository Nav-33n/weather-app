export default function HourForecast({ time, exactTime, icon, temp }) {
  const isCurrentHour = time === exactTime;
  const containerClass = `hour-container${isCurrentHour ? " hover" : ""}`;

  return (
    <div className={containerClass}>
      <p>{time}</p>
      <div className="under-line"></div>
      <div className="weather-icon">
        <img src={icon} alt={`Weather at ${time}`} />
      </div>
      <span>{`${temp} °C`}</span>
    </div>
  );
}
