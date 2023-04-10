import React, { useEffect } from "react";
export default function ({ msg, type, showAlert, listItems }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [listItems, showAlert]);
  return (
    <div className="msg-containerr">
      <p className={type}>{msg}</p>
    </div>
  );
}
