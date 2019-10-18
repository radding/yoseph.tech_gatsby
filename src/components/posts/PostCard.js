import React from "react";
import { Link } from "gatsby";

export default (props) => {
  return (
    <Link to={`/${props.post.categories[0].slug}/${props.post.slug}/`}>
      <figure className="img-rising mb-4">
        <img src={props.post.featured_media && props.post.featured_media.source_url} alt={props.post.img_description} className="img-fluid mb-2" />
        <figcaption className="h5 font-weight-normal">
          {props.post.title}
          <br />
          <span className="small text-muted" dangerouslySetInnerHTML={{ __html: props.post.excerpt }}></span>
          {!props.hideCategory && <span className="small"> <Link to={props.post.categories[0].slug} className="small">{props.post.categories[0].name}</Link></span>}
        </figcaption>
      </figure>
    </Link>
  )
}