import React, { useEffect, useState, useMemo } from "react";
import { createClient } from "pexels";

export default function CurrentWeather({ condition }) {
  const [photoData, setPhotoData] = useState(null);

  const client = useMemo(
    () => createClient(process.env.REACT_APP_PHOTO_API_KEY),
    []
  );

  useEffect(() => {
    if (!condition) return;

    const fetchPhoto = async () => {
      try {
        const res = await client.photos.search({ query: condition, per_page: 5 });
        setPhotoData(res);
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchPhoto();
  }, [condition, client]);

  const backgroundImage = useMemo(() => {
    if (!photoData || !photoData.photos || photoData.photos.length === 0) return null;
    const index = Math.floor(Math.random() * photoData.photos.length);
    return photoData.photos[index];
  }, [photoData]);

  useEffect(() => {
    if (!backgroundImage) return;

    document.body.style.backgroundImage = `url(${backgroundImage.src.landscape})`;

    const left = document.querySelector(".left-container");
    const right = document.querySelector(".right-container");

    if (left) left.style.backgroundImage = `url(${backgroundImage.src.landscape})`;
    if (right) right.style.backgroundColor = backgroundImage.avg_color;
  }, [backgroundImage]);

  if (!backgroundImage) {
    return <div className="condition">Loading...</div>;
  }

  const isLongCondition = condition.split(" ").length > 3;

  return (
    <div className={isLongCondition ? "text-wrap" : "condition"}>
      <p>{condition}</p>
    </div>
  );
}
