import React from "react";

const Field = (props) => {
  return (
    <div className="input-field">
      <div className={`field ${props.className || ""}`}>{props.children}</div>
      <div className={`message caption text-red`}>{props.message}</div>
    </div>
  );
};

export default Field;
