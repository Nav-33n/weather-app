import React, { useState, useEffect } from "react";

export default function Time({ timezone }) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeOptions = { timeZone: timezone };
      const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: timezone
      };

      setCurrentTime(now.toLocaleTimeString('en-US', timeOptions));
      setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
    };

    updateTime(); // initial call
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [timezone]);

  return (
    <div className="time">
      <p>{currentDate} <span>|</span> {currentTime}</p>
    </div>
  );
}
