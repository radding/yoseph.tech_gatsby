import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container } from "react-bootstrap";
import PostList from "../components/posts/PostList";
import ConditionalRenderer from "../components/ConditionalRender";

const dataToPost = (data) => {
  //props.data.recentPosts
  return data.edges.map(edge => ({ ...edge.node.frontmatter, ...edge.node }))
}

const IndexPage = (props) => {
  console.log(props.data);
  return (
    <Layout>
      <SEO title="Home" />
      <div className="bg-light text-black">
        <div className="container-fluid py-5 py-lg-6 text-center">
          <h1 className="display-3 pb-3">Welcome to Yoseph.Tech</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <p className="lead text-dark mb-0">
                Modern development made easy.
            </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white text-black">
        <Container className="py-5">
          <h2>Posts</h2>
          <ConditionalRenderer condition={props.data.popularPosts.edges.length > 0}>
            <div>
              <h3 className="small">Most Popular</h3>
              <PostList posts={dataToPost(props.data.popularPosts)} numberOfColumns={2} limit={4} />
            </div>
          </ConditionalRenderer>
          <div>
            <h3 className="small">Most Recent</h3>
            <PostList posts={dataToPost(props.data.recentPosts)} numberOfColumns={2} limit={4} />
          </div>
        </Container>
      </div>
      <ConditionalRenderer condition={props.data.recentTutorials.edges.length > 0 || props.data.popularTutorials.edges.length > 0}>
        <div className="bg-light text-black">
          <Container className="py-5">
            <h2>Tutorials</h2>
            <ConditionalRenderer condition={props.data.popularTutorials.edges.length > 0}>
              <div>
                <h3 className="small">Most Popular</h3>
                <PostList posts={dataToPost(props.data.popularTutorials)} numberOfColumns={2} limit={4} />
              </div>
            </ConditionalRenderer>
            <ConditionalRenderer condition={props.data.recentTutorials.edges.length > 0}>
              <div>
                <h3 className="small">Most Recent</h3>
                <PostList posts={dataToPost(props.data.recentTutorials)} numberOfColumns={2} limit={4} />
              </div>
            </ConditionalRenderer>
          </Container>
        </div>
      </ConditionalRenderer>
      <div className="bg-primary text-dark text-center">
        <div className="container py-6">
          <h2>Newsletter subscription</h2>
          <p className="mb-4">Subscribe to our newsletter to receive news &amp; updates.</p>
          <form>
            <div className="form-row justify-content-center align-items-center">
              <div className="col-md-4">
                <label className="sr-only" htmlFor="inputName">First name</label>
                <input type="text" className="form-control border-0 font-italic mb-3" id="inputName" placeholder="First Name" />
              </div>
              <div className="col-md-4">
                <label className="sr-only" htmlFor="inputEmail">Email address</label>
                <input type="email" className="form-control border-0 font-italic mb-3" id="inputEmail" placeholder="Email Address" />
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
  recentPosts: allMarkdownRemark(filter: {frontmatter: {layout: {in: ["blog", "blog-popular"]}}}, sort: {order: DESC, fields: frontmatter___date}) {
    edges {
      node {
        timeToRead
        id
        frontmatter {
          description
          title
          img
          date
          tag
          topic
          subTopic
          slug
        }
      }
    }
  }

  popularPosts: allMarkdownRemark(filter: {frontmatter: {layout: {eq: "blog-popular"}}},  sort: {order: DESC, fields: frontmatter___date}) {
    edges {
      node {
        timeToRead
        id
        frontmatter {
          description
          title
          img
          date
          tag
          topic
          subTopic
          slug
        }
      }
    }
  }

  recentTutorials: allMarkdownRemark(filter: {frontmatter: {layout: {in: ["tutorial", "tutorials-popular"]}}},  sort: {order: DESC, fields: frontmatter___date}) {
    edges {
      node {
        timeToRead
        id
        frontmatter {
          description
          title
          img
          date
          tag
          topic
          subTopic
          slug
        }
      }
    }
  }

  popularTutorials: allMarkdownRemark(filter: {frontmatter: {layout: {eq: "tutorials-popular"}}},  sort: {order: DESC, fields: frontmatter___date}) {
    edges {
      node {
        timeToRead
        id
        frontmatter {
          description
          title
          img
          date
          tag
          topic
          subTopic
          slug
        }
      }
    }
  }
}
`