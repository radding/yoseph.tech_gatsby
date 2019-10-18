import React from "react";
import { Row, Col } from "react-bootstrap";
import PostCard from "./PostCard";
import { Link } from "gatsby";

export default (props) => {
  const limit = props.limit || props.posts.length;

  const posts = props.posts.slice(0, limit);

  const seperated = [];
  let start = 0;
  const until = props.numberOfColumns;
  for (let i = 0; i <= limit; i++) {
    seperated.push(posts.slice(start, start + until));
    start += until;
  }
  return (
    <div className="container py-5">
      <div className="row grid" data-colcade="columns: .col-md-6, items: .grid-item">
        {seperated.map((row, ndx) => <Row key={ndx}>
          {row.map((col, ndx) => (
            <Col md={6} key={ndx}>
              <PostCard post={col} />
            </Col>
          ))}
        </Row>)}

      </div>
      {
        props.posts.length > limit &&
        (<Row>
          <p><Link to={props.readMore}>Read More</Link></p>
        </Row>)
      }
    </div>
  )
}