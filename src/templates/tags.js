import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ConditionalRender from "../components/ConditionalRender";
import { Container, Row, Col } from "react-bootstrap";
import PostCard from "../components/posts/PostCard";

export default (props) => {
  console.log("Data:", props);
  return (
    <Layout footerStyle="light">
      <SEO title={`${props.data.info.name}`} />
      <div className="bg-light text-black">
        <div className="container-fluid py-5 py-lg-6 text-center">
          <h1 className="display-6 pb-3 text-capitalize">Posts tagged with {props.data.info.name}</h1>
        </div>
      </div>
      <div className="bg-white text-black">
        <Container className="py-5">
          <h2 className="text-muted">Posts</h2>
          {props.data.allPosts.edges.map(edge => (
            <Row>
              <Col md={4}>
                <PostCard post={edge.node} />
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    </Layout>
  )
}

export const query = graphql`
query($id: Int!) {
  info: wordpressTag(wordpress_id: {eq: $id}) {
    description
    name
    slug
  }
  allPosts: allWordpressPost(filter: {tags: {elemMatch: {wordpress_id: {eq: $id}}}}, sort: {order: DESC, fields: date}) {
    edges {
      node {
        excerpt
        slug
        tags {
          slug
          name
        }
        categories {
          name
          slug
          description
        }
        featured_media {
          source_url
        }
        title
      }
    }
  }
}
`;