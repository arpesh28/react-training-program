import React from "react";

//  images
import deleteIcon from "../include/images/delete.png";

export default function taskCard({ task, count, deleteTask }) {
  return (
    <li
      className="d-flex justify-content-between"
      key={count}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div className="list-text">
        {count + 1}. {task}
      </div>
      <img
        src={deleteIcon}
        className="list-delete hover"
        alt=""
        onClick={(event) => {
          deleteTask(count);
        }}
      />
    </li>
  );
}
