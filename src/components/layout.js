/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import Helmet from 'react-helmet';

import Header from "./header"
import "../../themes/src/assets/scss/theme.scss";
import Footer from "./Footer";

const Layout = ({ children, ...props }) => {
  const [link, setLink] = useState(false);
  setTimeout(() => setLink(true), 100)
  return (
    <>
      <Helmet>
        {link && <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet" type="text/css" />}
      </Helmet>
      <Header />
      <main>
        {children}
      </main>
      <Footer footerStyle={props.footerStyle} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
