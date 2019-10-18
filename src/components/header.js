import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ConditionalRender from "./ConditionalRender";

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      wordpressAcfHeader(wordpress_id: {eq: 34}) {
        acf {
          links {
            link
            text
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
            yoseph.tech
        </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/tags/popular" className="nav-link">Popular Posts</Link>
            </li>
            {data.wordpressAcfHeader.acf.links.map((link, ndx) => (
              <li className="nav-item" key={ndx}>
                <Link to={link.link} className="nav-link">{link.text}</Link>
              </li>
            ))}
            <li className="nav-item">
              <Link href="/contact/" className="nav-link">Contact</Link>
            </li>
          </ul>
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
