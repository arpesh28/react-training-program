import React from "react";

export default function taskCard({ handleClick, disabled, title }) {
  return (
    <button onClick={handleClick} disabled={disabled}>
      {title}
    </button>
  );
}
