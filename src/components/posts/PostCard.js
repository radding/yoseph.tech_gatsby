import React from "react";
import { Link } from "gatsby";

export default (props) => {
  return (
    <Link to={`/${props.post.topic}/${props.post.subTopic}/${props.post.slug}/`}>
      <figure className="img-rising mb-4">
        <img src={props.post.img} alt={props.post.img_description} className="img-fluid mb-2" />
        <figcaption className="h5 font-weight-normal">
          {props.post.title}
          <br />
          <span className="small text-muted">{props.post.description}</span>
          <br />
          <span className="small text-muted">Time to Read: {props.post.timeToRead} Minutes</span>
        </figcaption>
      </figure>
    </Link>
  )
}