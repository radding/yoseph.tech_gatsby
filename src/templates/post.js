import React from "react";
import { graphql, Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Popular from "../components/popular";

const exclude = [
  "homepage-feature",
  "page-popular",
]

export default (props) => {
  const data = props.data.wordpressPost;
  return (
    <Layout footerStyle="light">
      <SEO title={data.title} description={data.excerpt} />
      <div className="bg-light text-black pb-6">
        <div className="container py-5 py-lg-5 text-center">
          <img className="img-fluid" src={data.featured_media.source_url} alt={data.featured_media && data.featured_media.alt_text} />
          <h1 className="display-6 py-3">{data.title}</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="lead text-dark mb-0 small" dangerouslySetInnerHTML={{ __html: data.excerpt }}>
              </div>
            </div>
          </div>
          <hr className="border-1 border-black my-4 text-left w-15" role="presentation"></hr>
        </div>
      </div>
      <div className="bg-white text-black">
        <Container className="py-3">
          <div className="mt-n6 bg-white p-4">
            <Row>
              <Col>
                <p className="small text-muted mb-3">{moment(data.date).format("MMMM Do, YYYY")} in <Link className="p-2" to={`/${data.categories[0].slug}/`}>{data.categories[0].name}</Link></p>
              </Col>
            </Row>
            <Row>
              <Col>
                <div dangerouslySetInnerHTML={{ __html: data.content }} id="__post-content" />
              </Col>
            </Row>
            <hr />
            <Row className="py-3">
              {data.tags && data.tags.map((tag) => {
                if (exclude.indexOf(tag.slug) > -1) {
                  return null;
                }
                return (
                  <Col md={3} className="d-flex flex-column">
                    <Link className="btn-sm btn btn-outline-dark p-1" to={`/tags/${tag.slug}`}>{tag.name}</Link>
                  </Col>
                )
              })}
            </Row>
            <hr />
            <Popular />
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export const query = graphql`
query($id: Int!) {
  wordpressPost(wordpress_id: {eq: $id}) {
    title
    content
    date
    excerpt
    featured_media {
      source_url
      alt_text
    }
    tags {
      name
      slug
    }
    categories {
      name
      slug
      description
    }
  }
}
`