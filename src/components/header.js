import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import MyLink from "./links";
import Img from "gatsby-image"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file (relativePath: {eq: "logo.png"}) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      wordpressAcfHeader(wordpress_id: {eq: 34}) {
        acf {
          links {
            link
            text
            is_internal
          }
        }
      }
    }
  `);
  return (
    <header className="site-header fixed-top bg-white border-bottom border-light">
      <a href="#content" className="sr-only sr-only-focusable">Skip to content</a>
      <div className="container">
        <nav className="navbar main-nav navbar-expand-lg navbar-light" aria-label="Main navigation">
          <Link to="/" className="navbar-brand d-inline-flex text-uppercase">
            <Img fixed={data.file.childImageSharp.fixed} alt="Yoseph.tech" style={{ maxHeight: "none" }} />
            {/* <img src="/src/images/1.png" alt="My Logo" /> */}
            {/* yoseph.tech */}
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarContent" className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/tags/popular" className="nav-link" activeClassName="active">Popular</Link>
              </li>
              {data.wordpressAcfHeader.acf.links.map((link, ndx) => (
                <li className="nav-item" key={ndx}>
                  <MyLink link={link.link} text={link.text} className="nav-link" activeClassName="active" isInternal={link.is_internal} />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
