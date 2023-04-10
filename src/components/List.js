import React from "react";

export default function List(props) {
  return (
    <div>
      {/* <i className="fa-solid fa-check done"></i> */}
      <i
        className="fa-regular fa-square-check done"
        onClick={() => {
          props.handleDone(props.id);
        }}
      ></i>
      <li>{props.listItem}</li>

      <i
        className="fa-solid fa-pen-to-square edit"
        onClick={() => {
          props.edit(props.id);
        }}
      ></i>
      <i
        className="fa-solid fa-trash trash"
        onClick={() => {
          props.onDelete(props.id);
        }}
      ></i>
    </div>
  );
}
