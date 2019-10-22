import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useStaticQuery, graphql } from "gatsby";
import MyLink from "./links";

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
          is_internal
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
            <Col md={4} xs={6} className="my-4" key={ndx}>
              <h4 className="h6">{col.title}</h4>
              <ul className="nav flex-column">
                {col.links.map((link, ndx) => (
                  <li className="mb-1" key={ndx}>
                    <MyLink link={link.link} text={link.text} isInternal={link.is_internal} />
                  </li>
                ))}
              </ul>
            </Col>
          ))}

          <Col md={4} sm={12} className="mb-4">
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