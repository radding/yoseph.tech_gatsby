import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useStaticQuery, graphql } from "gatsby";

export default (props) => {
  const footer = useStaticQuery(graphql`{
    wordpressAcfFooter(wordpress_id: {eq: 35}) {
    acf {
      about {
        title
        content
      }
      column {
        links {
          link
          text
        }
        title
      }
    }
  }
}
  `);
  console.log(footer);
  const footerStyle = props.footerStyle || "white";
  return (
    <footer className={`bg-${footerStyle} text-dark`}>
      <Container className="pt-6 pb-2">
        <hr />
        <Row className="justify-content-md-between">
          {footer.wordpressAcfFooter.acf.column.map((col, ndx) => (
            <Col className="col-md-3 my-4" key={ndx}>
              <h4 className="h6">{col.title}</h4>
              <ul className="nav flex-column">
                {col.links.map((link, ndx) => (
                  <li className="mb-1" key={ndx}>
                    <a href={link.link}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}

          <Col className="col-sm-12 col-md-4 mb-4">
            <h4 className="h6 my-4">{footer.wordpressAcfFooter.acf.about.title}</h4>
            <div className="text-muted" dangerouslySetInnerHTML={{ __html: footer.wordpressAcfFooter.acf.about.content }}></div>
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