import React from "react";

export default function Degree({ celcius }) {
  const roundedTemp = Math.round(celcius);

  return (
    <div className="degree">
      <span>{`${roundedTemp} °C`}</span>
    </div>
  );
}
