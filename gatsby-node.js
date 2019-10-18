/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// import path from "path";
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    {
      tags: allWordpressTag {
        edges {
          node {
            name
            slug
            wordpress_id
          }
        }
      }
      categories: allWordpressCategory {
        edges {
          node {
            slug
            description
            name
            wordpress_id
          }
        }
      }
      posts: allWordpressPost {
        edges {
          node {
            slug
            wordpress_id
            categories {
              slug
            }
          }
        }
      }
    }
  `);
  result.data.tags.edges.forEach(({ node }) => {
    console.log(node);
    actions.createPage({
      path: `/tags/${node.slug}`,
      component: path.resolve("./src/templates/tags.js"),
      context: {
        id: node.wordpress_id,
      }
    })
  });
  result.data.categories.edges.forEach(({ node }) => {
    console.log(node);
    actions.createPage({
      path: node.slug,
      component: path.resolve("./src/templates/hub.js"),
      context: {
        id: node.wordpress_id,
      }
    })
  });
  result.data.posts.edges.forEach(({ node }) => {
    actions.createPage({
      path: `/${node.categories[0].slug}/${node.slug}`,
      component: path.resolve("./src/templates/post.js"),
      context: {
        id: node.wordpress_id,
      }
    })
  })
}