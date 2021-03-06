import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

const Image = (props) => {
  if (!props.featured_media) {
    return null
  }
  return <Img fluid={props.featured_media.localFile.childImageSharp.fluid} alt={props.featured_media.alt} />
}

export default (props) => {
  return (
    <figure className={`img-rising mb-4 ${props.center ? "text-center" : ""} mr-3`}>
      <Link to={`/${props.post.categories[0].slug}/${props.post.slug}/${props.linkToAmp ? "amp/" : ""}`}>
        <Image {...props.post} className="mx-auto width-450" />
        <figcaption className="h5 font-weight-normal">
          <span dangerouslySetInnerHTML={{ __html: props.post.title }} />
          <br />
          <span className="small text-muted" dangerouslySetInnerHTML={{ __html: props.post.excerpt }}></span>
        </figcaption>
      </Link>
      {!props.hideCategory && <span className="h5 md-small"> <Link to={`/${props.post.categories[0].slug}/`} className="small">{props.post.categories[0].name}</Link></span>}
    </figure>
  )
}