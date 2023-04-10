import React, { useEffect, useRef } from "react";

export default function Input(props) {
  const [text, setText] = React.useState("");
  const inputRef = useRef();

  function handleChange(event) {
    const { value } = event.target;

    setText(value);
  }

  useEffect(() => {
    if (props.editList) {
      setText(props.editList);
      inputRef.current.focus();
    }
  }, [props.editList]);
  return (
    <div className="container">
      <input
        onChange={handleChange}
        ref={inputRef}
        type="text"
        placeholder="Your task for today"
        value={text}
        onKeyUp={(event) => {
          props.submit(event, text, setText);
        }}
      />
      <button
        type="submit"
        onClick={() => {
          if (props.editList) {
            props.updateList(text);
          } else {
            props.addItem(text);
          }
          setText("");
        }}
        className="btn"
      >
        {props.editList ? "Edit" : "Add"}
      </button>
    </div>
  );
}
