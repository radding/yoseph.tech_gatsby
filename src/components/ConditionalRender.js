import React from "react";

export default (props) => {
  if (!props.condition) {
    return null;
  }
  return (
    <>
      {props.children}
    </>
  )
}