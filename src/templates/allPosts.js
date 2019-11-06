import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Container, Row, Col } from "react-bootstrap";
import PostCard from "../components/posts/PostCard";
import Pagination from "../components/pagination";

export default (props) => {
  return (
    <Layout>
      <SEO title="All Posts" description="All Posts sorted by most recent" />
      <div className="bg-light text-black">
        <div className="container-fluid py-5 py-lg-6 text-center">
          <h1 className="display-3 pb-3">Browse all posts</h1>
        </div>
      </div>
      <div className="bg-white text-black">
        <Container className="py-5">
          <Row>
            {props.data.mostRecent.edges.map((edge, key) => (
              <Col key={key} md={4}>
                <PostCard post={edge.node} />
              </Col>
            ))}
          </Row>
          <Pagination slugBase="/posts" {...props.pageContext} />
        </Container>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
query ($limit: Int!, $skip: Int!){
  mostRecent: allWordpressPost(
    sort: {order: DESC, fields: date},
    limit: $limit,
    skip: $skip) {
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
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}`;