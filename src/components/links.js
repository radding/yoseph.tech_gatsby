import React from "react";
import { Link } from "gatsby";

export default (props) => {
  if (props.isInternal) {
    return (<Link to={props.link} className={props.className} activeClassName={props.activeClassName}>{props.text}</Link>)
  }
  return (<a href={props.link} className={props.className} target="__blank">{props.text}</a>)
}