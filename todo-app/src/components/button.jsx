import React, { memo } from "react";

const taskCard = ({ handleClick, disabled, title }) => {
  console.log("button rendered!!");
  return (
    <button onClick={handleClick} disabled={disabled}>
      {title}
    </button>
  );
};
export default memo(taskCard);
