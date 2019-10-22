import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageHeader";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "gatsby";
import Popular from "../components/popular";

const NotFoundPage = () => (
  <Layout footerStyle="light">
    <SEO title="404: Not found" description={"Page Not Found"} />
    <PageHeader title="Looks like you found something that doesn't exsist.">
      <Col>
        <h2 className="h4">Not to worry, you can still see our awesome content on my homepage</h2>
        <Link to="/" className="btn btn-outline-dark mt-4">Take Me there</Link>
      </Col>
    </PageHeader>
    <div className="bg-white text-black">
      <Container>
        <Row className="py-4">
          <Col>
            <h3 className="text-center">Not sure what you're looking for? </h3>
            <h4 className="text-center">Check out these popular posts:</h4>
          </Col>
        </Row>
        <Popular hideTitle />
      </Container>
    </div>
  </Layout>
)

export default NotFoundPage
