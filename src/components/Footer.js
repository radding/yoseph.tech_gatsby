import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";

export default () => {
  return (
    <footer className="bg-white text-dark">
      <Container className="pt-6 pb-2">
        <Row className="justify-content-md-between">
          <Col className="col-4 col-md-2 mb-4">
            <h4 className="h6">About</h4>
            <ul className="nav flex-column">
              <li className="mb-1">
                <Link to="/me">Who I am</Link>
              </li>
              <li className="mb-1">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="mb-1">
                <Link to="/mission">Our Mission</Link>
              </li>
            </ul>
          </Col>

          <Col className="col-4 col-md-2 mb-4">
            <h4 className="h6 mb-3">Services</h4>
            <ul className="nav flex-column">
              <li className="mb-1">
                <Link to="/services/consulting">Delivery Consulting</Link>
              </li>
              <li className="mb-1">
                <Link to="/services/design">Design</Link>
              </li>
              <li className="mb-1">
                <Link to="/services/contracting">Software Development</Link>
              </li>
            </ul>
          </Col>

          <Col className="col-4 col-md-2 mb-4">
            <h4 className="h6 mb-3">Social</h4>
            <ul className="nav flex-column">
              <li className="mb-1">
                <Link to="/services/consulting">LinkedIn</Link>
              </li>
              <li className="mb-1">
                <Link to="/services/design">Twitter</Link>
              </li>
              <li className="mb-1">
                <Link to="/services/contracting">Github</Link>
              </li>
            </ul>
          </Col>

          <Col className="col-sm-12 col-md-4 mb-4">
            <h4 className="h6 mb-3">Company</h4>
            <p className="text-muted">Yoseph.Tech is focused on delivering the best content on modern development practices. Shuttl is focused on helping your organization reach its technology goals.</p>
          </Col>

        </Row>
        <hr />
        <Row>
          <Col style={{ textAlign: "center" }}>
            © {new Date().getFullYear()}, Built with
          {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>,
            Powered by <a href="https://shuttl.io">Shuttl</a>
          </Col>
        </Row>
      </Container>

    </footer>
  )
}