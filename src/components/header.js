import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ConditionalRender from "./ConditionalRender";

const Header = () => {
  const data = useStaticQuery(graphql`
  query{
    allMarkdownRemark(filter: {frontmatter: {layout: {in: ["tutorial", "tutorials-popular"]}}},  sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          id
        }
      }
    }
  }`);
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
              <Link to="/posts/" className="nav-link">Posts</Link>
            </li>
            <ConditionalRender condition={data.allMarkdownRemark.edges.length > 0}>
              <li className="nav-item">
                <Link to="/tutorials/" className="nav-link">Tutorials</Link>
              </li>
            </ConditionalRender>
            <li className="nav-item">
              <Link to="/about/" className="nav-link">About</Link>
            </li>
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
