/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// import path from "path";
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  actions.createRedirect({
    fromPath: "/lets-change-how-we-speak-about-testing/",
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/engineering/from-test-driven-development-to-test-driven-design/`,
  });

  actions.createRedirect({
    fromPath: "/building-production-code/",
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/engineering/building-production-code/`,
  });

  actions.createRedirect({
    fromPath: "/building-an-arcade-controller/",
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/raspberry-pi/building-an-arcade-controller/`,
  });

  actions.createRedirect({
    fromPath: "/completely-useless-fun-project-building-the-parser/",
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/compilers/completely-useless-fun-project-building-the-parser/`,
  });

  // **Note:** The graphql function call returns a Promise
  const postPerPage = 12;
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    {
      tags: allWordpressTag(filter: {count: {gt: 0}}) {
        edges {
          node {
            name
            slug
            wordpress_id
            count
          }
        }
      }
      categories: allWordpressCategory(filter: {count: {gt: 0}}) {
        edges {
          node {
            slug
            description
            name
            wordpress_id
            count
          }
        }
      }
      posts: allWordpressPost(
        sort: {order: DESC, fields: date},
      )
        {
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
    const numOfPages = Math.ceil(node.count / postPerPage);
    Array.from({ length: numOfPages }).forEach((_, ndx) => {
      actions.createPage({
        path: ndx === 0 ? `/tags/${node.slug}` : `/tags/${node.slug}/${ndx + 1}`,
        component: path.resolve("./src/templates/tags.js"),
        context: {
          limit: postPerPage,
          skip: ndx * postPerPage,
          id: node.wordpress_id,
          numOfPages,
          currentPage: ndx + 1,
        }
      })
    });
  });
  result.data.categories.edges.forEach(({ node }) => {
    const numOfPages = Math.ceil(node.count / postPerPage);
    Array.from({ length: numOfPages }).forEach((_, ndx) => {
      if (node.count === 0) {
        return;
      }
      actions.createPage({
        path: ndx === 0 ? node.slug : `${node.slug}/${ndx + 1}`,
        component: path.resolve("./src/templates/hub.js"),
        context: {
          limit: postPerPage,
          skip: ndx * postPerPage,
          id: node.wordpress_id,
          numOfPages,
          currentPage: ndx + 1,
        }
      })
    });
  });

  const catsPerPage = 5;
  const numOfPagesCat = Math.ceil(result.data.categories.edges.length / catsPerPage);
  Array.from({ length: numOfPagesCat }).forEach((_, ndx) => {
    actions.createPage({
      path: ndx === 0 ? "/categories" : `/categories/${ndx + 1}`,
      component: path.resolve("./src/templates/categories.js"),
      context: {
        limit: catsPerPage,
        skip: ndx * catsPerPage,
        numOfPages: numOfPagesCat,
        currentPage: ndx + 1,
        categories: result.data.categories.edges.slice(ndx * catsPerPage, ndx * catsPerPage + catsPerPage).map(cat => cat.node.wordpress_id),
      }
    });
  })

  result.data.posts.edges.forEach(({ node }) => {
    actions.createPage({
      path: `/${node.categories[0].slug}/${node.slug}`,
      component: path.resolve("./src/templates/post.js"),
      context: {
        id: node.wordpress_id,
      }
    })
    actions.createPage({
      path: `/${node.categories[0].slug}/${node.slug}/amp`,
      component: path.resolve("./src/templates/post.amp.js"),
      context: {
        id: node.wordpress_id,
      }
    })
  });

  const postsPerPage = 20;
  const numOfPagesPost = Math.ceil(result.data.posts.edges.length / postsPerPage);
  Array.from({ length: numOfPagesPost }).forEach((_, ndx) => {
    actions.createPage({
      path: ndx === 0 ? "/posts" : `/posts/${ndx + 1}`,
      component: path.resolve("./src/templates/allPosts.js"),
      context: {
        limit: postsPerPage,
        skip: ndx * postsPerPage,
        numOfPages: numOfPagesPost,
        currentPage: ndx + 1,
      }
    });
  })
}