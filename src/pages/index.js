import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap";
import PostList from "../components/posts/PostList";
import ConditionalRenderer from "../components/ConditionalRender";
import PostCard from "../components/posts/PostCard";

const dataToPost = (data) => {
  //props.data.recentPosts
  return data.edges.map(edge => ({ ...edge.node }))
}

const IndexPage = (props) => {
  return (
    <Layout>
      <SEO title="Welcome | Yoseph.Tech" />
      <div className="bg-light text-black">
        <div className="container-fluid py-5 py-lg-6 text-center">
          <h1 className="display-3 pb-3">Welcome to Yoseph.Tech</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <p className="lead text-dark mb-0">
                Modern development ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white text-black">
        <Container className="py-5">
          <ConditionalRenderer condition={props.data.featured.edges.length > 0}>
            <h2>My Pick</h2>
            <Row>
              <Col md={6} className="mx-auto">
                <PostCard post={dataToPost(props.data.featured)[0]} center imgSize={45} />
              </Col>
            </Row>
          </ConditionalRenderer>
        </Container>
      </div>
      <div className="bg-light text-black">
        <Container className="py-5">
          <h2>Posts</h2>
          <ConditionalRenderer condition={props.data.mostPopular.edges.length > 0}>
            <div>
              <h3 className="small">Most Popular</h3>
              <PostList posts={dataToPost(props.data.mostPopular)} numberOfColumns={2} limit={6} />
            </div>
          </ConditionalRenderer>
          <div>
            <h3 className="small">Most Recent</h3>
            <PostList posts={dataToPost(props.data.mostRecent)} numberOfColumns={2} limit={6} />
            <p className="text-right">
              <Link to="/posts" className="px-3">See All Posts <i className="fas fa-long-arrow-alt-right px-2"></i></Link>
            </p>
          </div>
        </Container>
      </div>
      <div className="bg-white text-black">
        <Container className="py-5 text-center">
          <h2>Browse All Categories</h2>
          <p>Don't see something that catches your interest here? <Link to="/categories" >Browse all categories <i className="fas fa-long-arrow-alt-right px-2"></i></Link></p>
        </Container>
      </div>
      <div className="bg-primary text-dark text-center">
        <div className="container py-6">
          <h2>Newsletter subscription</h2>
          <p className="mb-4">Subscribe to our newsletter to receive news &amp; updates.</p>
          <form action="https://shuttl.us13.list-manage.com/subscribe/post?u=29eec081828629fffd977e88f&amp;id=2892f34576" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <div className="form-row justify-content-center align-items-center">
              <div className="col-md-4">
                <label className="sr-only" htmlFor="mce-FNAME">First name</label>
                <input type="text" name="FNAME" className="form-control border-0 font-italic mb-3" id="mce-FNAME" placeholder="First Name" />
              </div>
              <div className="col-md-4">
                <label className="sr-only" htmlFor="mce-EMAIL">Email address</label>
                <input type="email" name="EMAIL" className="form-control border-0 font-italic mb-3" id="mce-EMAIL" placeholder="Email Address" />
              </div>
              <div className="col-md-auto">
                <button type="submit" className="btn btn-dark mb-3">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}


export default IndexPage

export const pageQuery = graphql`
    
query stuff {
  featured: allWordpressPost(sort: {order: DESC, fields: date}, limit: 1, filter: {tags: {elemMatch: {slug: {eq: "homepage-feature"}}}}) {
    edges {
      node {
        excerpt
        slug
        title
        categories {
          name
          slug
          description
        }
        date
        status
        sticky
        template
        featured_media {
          source_url
          alt_text
localFile {
        childImageSharp {
          fluid (maxWidth: 450){
            ...GatsbyImageSharpFluid
          }
        }
      }
        }
      }
    }
  }

  mostPopular: allWordpressPost(sort: {order: DESC, fields: date}, limit: 6, filter: {tags: {elemMatch: {slug: {eq: "popular"}}}}) {
    edges {
      node {
        excerpt
        slug
        title
        categories {
          name
          slug
          description
        }
        date
        status
        sticky
        template
        featured_media {
          source_url
          alt_text
localFile {
        childImageSharp {
          fluid (maxWidth: 450){
            ...GatsbyImageSharpFluid
          }
        }
      }
        }
      }
    }
  }
  
  mostRecent: allWordpressPost(sort: {order: DESC, fields: date}, limit: 6, filter: {}) {
    edges {
      node {
        excerpt
        slug
        title
        categories {
          name
          slug
          description
        }
        date
        status
        sticky
        template
        featured_media {
          source_url
          alt_text
localFile {
        childImageSharp {
          fluid(maxWidth: 450) {
            ...GatsbyImageSharpFluid
          }
        }
      }
        }
      }
    }
  }
}

`