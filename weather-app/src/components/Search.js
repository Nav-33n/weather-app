import React, { useEffect, useState, useRef } from "react";

export default function Search({ place, region, country, search }) {
  const [placeholder, setPlaceholder] = useState('');
  const inputRef = useRef(null);

  const regionDisplay = region || country;

  useEffect(() => {
    setPlaceholder(`${place}, ${regionDisplay}`);
  }, [place, regionDisplay]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const value = inputRef.current.value.trim();
      if (value) {
        search(value);
        inputRef.current.value = '';
      }
    }
  }

  return (
    <div className="searchbar">
      <input
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        placeholder={placeholder}
      />
    </div>
  );
}
