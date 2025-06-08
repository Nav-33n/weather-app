export default function Wind({ direction, speed }) {
  function getDirection(degree) {
    const directions = [
      'North', 'North-Northeast', 'Northeast', 'East-Northeast',
      'East', 'East-Southeast', 'Southeast', 'South-Southeast',
      'South', 'South-Southwest', 'Southwest', 'West-Southwest',
      'West', 'West-Northwest', 'Northwest', 'North-Northwest'
    ];

    const index = Math.round(degree / 22.5) % 16;
    return directions[index] || 'Unknown';
  }

  const windDirection = getDirection(direction);

  return (
    <div className="wind">
      <p><i className="fa-solid fa-wind"></i> {windDirection}, {speed} Km/h</p>
    </div>
  );
}
