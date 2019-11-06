import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";
import Pagination from "../components/pagination";
import PostCard from "../components/posts/PostCard";

const description = `Browse all categories of posts that I have on my site.`

export default (props) => {
  let realNdx = -1;
  console.log(props);
  return (
    <Layout>
      <SEO title="Browse all categories" description={description} />
      <div className="bg-light text-black">
        <div className="container-fluid py-5 py-lg-6 text-center">
          <h1 className="display-3 pb-3">Browse all Categories</h1>
        </div>
      </div>
      {props.data.allWordpressCategory.edges.map((edge, ndx) => {
        const posts = props.data.posts.edges.filter((pEdge) => pEdge.node.categories[0].wordpress_id === edge.node.wordpress_id);
        if (edge.node.count === 0) {
          return null;
        }
        realNdx++;
        return (
          <div className={`${realNdx % 2 === 0 ? "bg-white" : "bg-light"} text-black`} key={ndx}>
            <Container className="py-3">
              <div className="p-4">
                <h2 className="text-capitalize pb-4">{edge.node.name}</h2>
                <div dangerouslySetInnerHTML={{ __html: edge.node.description }} />
                <div className="py-4">
                  <h3 className="py-4">Recent Posts</h3>
                  <Row>
                    {posts.map((edge, ndx) => (
                      <Col md={4} key={ndx}>
                        <PostCard post={edge.node} hideCategory />
                      </Col>
                    ))}
                  </Row>
                </div>
                <Link to={edge.node.slug}>See all Posts <i className="fas fa-long-arrow-alt-right"></i></Link>
              </div>
            </Container>
          </div>
        );
      })}
      <div className={`${realNdx % 2 === 0 ? "bg-white" : "bg-light"} text-black`}>
        <Container className="py-3">
          <Pagination slugBase="/categories" {...props.pageContext} />
        </Container>
      </div>
    </Layout>
  );
};


export const pageQuery = graphql`
query ($limit: Int!, $skip: Int!, $categories: [Int!]){
  allWordpressCategory(
    limit: $limit,
    skip: $skip,
    filter: {count: {gt: 0}}
  ) {
    edges {
      node {
        wordpress_id
        count
        name
        slug
        description
      }
    }
  }
  posts: allWordpressPost(
    filter: {categories: {elemMatch: {wordpress_id: {in: $categories}}}}, sort: {order: DESC, fields: date},
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
          wordpress_id
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

`
