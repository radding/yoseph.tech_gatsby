import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Row, Col } from "react-bootstrap";

import PostCard from "./posts/PostCard";

export default (props) => {
  const response = useStaticQuery(graphql`
    query {
    allWordpressPost(sort: {order: DESC, fields: date}, limit: 6, filter: {tags: {elemMatch: {slug: {eq: "popular"}}}}) {
      edges {
        node {
          excerpt
          slug
          title
          categories {
            name
            slug
            description
          }
          date
          status
          sticky
          template
          featured_media {
            source_url
            alt_text
          }
        }
      }
    }
    }
  `);

  return (
    <>
      {!props.hideTitle && (<Row>
        <Col>
          <h3 className="text-muted"><small>Popular Posts</small></h3>
        </Col>
      </Row>
      )}
      <Row>
        {response.allWordpressPost.edges.map(({ node }, ndx) => {
          return (
            <Col md={4} key={ndx}>
              <PostCard post={node} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}