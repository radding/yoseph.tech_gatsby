import React from "react";
import { Container } from "react-bootstrap";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Popular from "../components/popular";

export default (props) => {
  const data = useStaticQuery(graphql`
  query MyQuery {
	wordpressPage(wordpress_id:{eq: 39}) {
    content
    title
    acf {
      excerpt
    }
  }
}
  `).wordpressPage;
  return (
    <Layout>
      <SEO title="About Me" description={`About Me: ${data.excerpt}`} pathname="/about" />
      <div className="bg-light text-black pb-3">
        <div className="container py-5 py-lg-5 text-center">
          <h1 className="display-6 py-3">{data.title}</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="lead text-dark mb-0 small text-muted" dangerouslySetInnerHTML={{ __html: data.acf.excerpt }}>
              </div>
            </div>
          </div>
          <hr className="border-1 border-black my-4 text-left w-15" role="presentation"></hr>
          <div className="py-3 text-center">
            <a href="https://twitter.com/radding" target="__blank" className="px-5 h3"><i className="fab fa-twitter"></i></a>
            <a href="https://github.com/radding" target="__blank" className="px-5 h3"><i className="fab fa-facebook-square"></i></a>
            <a href="https://www.linkedin.com/in/yosephradding/" target="__blank" className="px-5 h3"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className="bg-white text-black">
        <Container className="py-3">
          <div className="bg-white p-4">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </Container>
      </div>
      <div className="bg-light text-black">
        <Container className="py-3">
          <Popular />
        </Container>
      </div>
    </Layout>
  )
}
