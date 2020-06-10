import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ConditionalRender from "../components/ConditionalRender";
import { Container, Row, Col } from "react-bootstrap";
import PostCard from "../components/posts/PostCard";
import Popular from "../components/popular";
import Pagination from "../components/pagination";

export default (props) => {
  return (
    <Layout>
      <SEO title={`${props.data.info.name}`} description={props.data.info.description} pathname={props.path} />
      <div className="bg-light text-black">
        <div className="container-fluid py-5 py-lg-6 text-center">
          <h1 className="display-6 pb-3">Yoseph.Tech's Take on {props.data.info.name}</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <p className="lead text-dark mb-0">
                {props.data.info.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white text-black">
        <ConditionalRender condition={props.data.allPosts.edges.length > 0}>
          <Container className="py-5">
            <h2>Recent Posts</h2>
            <Row>
              {props.data.allPosts.edges.map(edge => (
                <Col md={4}>
                  <PostCard post={edge.node} hideCategory />
                </Col>
              ))}
            </Row>
            <Pagination slugBase={props.data.info.slug} {...props.pageContext} />
          </Container>
        </ConditionalRender>
      </div>
      <div className="bg-light text-black">
        <ConditionalRender condition={props.data.featured.edges.length > 0}>
          <Container className="py-5">
            <h2>My Picks</h2>
            <Row>
              {props.data.featured.edges.map(edge => (
                <Col md={4}>
                  <PostCard post={edge.node} hideCategory />
                </Col>
              ))}
            </Row>
          </Container>
        </ConditionalRender>
      </div>
      <div className="bg-white">
        <Container>
          <Popular />
        </Container>
      </div>
    </Layout>
  )
}

export const query = graphql`
query($id: Int!, $limit: Int!, $skip: Int!) {
  info:  wordpressCategory(wordpress_id: {eq: $id}) {
    description
    name
    slug
  }
  featured: allWordpressPost(
    filter: {categories: {elemMatch: {wordpress_id: {eq: $id}}}, tags: {elemMatch: {slug: {eq: "page-popular"}}}}, 
    sort: {order: DESC, fields: date},
    limit: 6
  ) {
    edges {
      node {
        excerpt
        slug
        tags {
          slug
          name
        }
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
        categories {
          name
          slug
          description
        }
        title
      }
    }
  }
  allPosts: allWordpressPost(
    filter: {categories: {elemMatch: {wordpress_id: {eq: $id}}}}, sort: {order: DESC, fields: date},
    limit: $limit,
    skip: $skip
  ) {
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
          alt_text
localFile {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
        }
        title
      }
    }
  }
}
`;
