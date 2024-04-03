const compareDesc = require("date-fns/compareDesc");
const parseISO = require("date-fns/parseISO");
const { graphql } = require("gatsby");

const pagesToWordPressIDs = {
    "/": 183,
    "/about/": 39,
}

const paginateResponse = (pageSize) => (posts) => {
    return posts.reduce((acc, post) => {
        if (acc[acc.length - 1].length >= pageSize) {
            acc.push([]);
        }
        acc[acc.length - 1].push(post.databaseId);
        return acc;
    }, [[]]).filter(page => page.length > 0);
}

const sortPosts = (posts) => {
    return posts.sort((postA, postB) => {
        const dateA = parseISO(postA.modifiedGmt, "yyyy-MM-ddTHH:mm:ss", new Date());
        const dateB = parseISO(postB.modifiedGmt);
        return compareDesc(dateA, dateB);
    });
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const wpID = pagesToWordPressIDs[page.path];
  if (!wpID) {
    return;
  }

  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      wpID,
    },
  })
}

exports.createPages = async function ({ actions, graphql }) {
    const { data } = await graphql(`
        query CreatePageQuery {
            tags: allWpTag {
    nodes {
      slug
      name
      posts{
        nodes {
          databaseId
          modifiedGmt
        }
      }
    }
  }
  
  categories: allWpCategory {
    nodes {
      slug
      posts {
        nodes {
          databaseId
          modifiedGmt
        }
      }
    }
  }
        posts: allWpPost {
            nodes {
                databaseId
                categories {
                    nodes {
                        slug
                    }
            
                }
                slug
                modifiedGmt

            }
        }
    }`);
    const paginator = paginateResponse(25);
    const tags = data.tags.nodes.reduce((acc, tag) => {
        const sortedPosts = sortPosts(tag.posts.nodes);
        acc[tag.slug] = {
            pages: paginator(sortedPosts),
            latestDate: sortedPosts[0],
        }
        return acc;
    }, {});

    const categories = data.categories.nodes.reduce((acc, tag) => {
        const sortedPosts = sortPosts(tag.posts.nodes);
        acc[tag.slug] = {
            pages: paginator(sortedPosts),
            latestDate: sortedPosts[0],
        }
        return acc;
    }, {});

    console.log(tags, categories);
    
    data.posts.nodes.forEach((post) => {
        const categorySlug = post.categories.nodes[0].slug;
        const postSlug = post.slug;
        actions.createPage({
            path: `/${categorySlug}/${postSlug}`,
            component: require.resolve(`./src/templates/post.tsx`),
            context: { databaseID: post.databaseId, modifiedTime: post.modifiedGmt },
        });
    });

    const allPosts = paginator(sortPosts(data.posts.nodes));

    allPosts.forEach((page, ndx) => {
        actions.createPage({
            path: ndx === 0 ? `/posts/` : `/posts/${ndx + 1}`,
            component: require.resolve(`./src/templates/collection.tsx`),
            context: {
                slug: "posts",
                posts: page,
                pageNumber: ndx + 1,
                numberOfPages: allPosts.length,
            }
        })
    })

    Object.entries(tags).filter(([_, info]) => info.pages.length > 0).forEach(([tag, tagInfo]) => {
        tagInfo.pages.forEach((page, ndx) => {
            actions.createPage({
                path:  ndx === 0 ? `/tags/${tag}` : `/tags/${tag}/${ndx + 1}`,
                component: require.resolve(`./src/templates/collection.tsx`),
                context: {
                    slug: tag,
                    pageType: "Tag",
                    posts: page,
                    pageNumber: ndx + 1,
                    numberOfPages: tagInfo.pages.length,
                    modifiedTime: tagInfo.latestDate.modifiedGmt
                }
            });
        })
    });

    Object.entries(categories).filter(([_, info]) => info.pages.length > 0).forEach(([tag, categoryInfo]) => {
        categoryInfo.pages.forEach((page, ndx) => {
            actions.createPage({
                path:  ndx === 0 ? `/${tag}` : `/${tag}/${ndx + 1}`,
                component: require.resolve(`./src/templates/collection.tsx`),
                context: {
                    slug: tag,
                    pageType: "Category",
                    posts: page,
                    pageNumber: ndx + 1,
                    numberOfPages: categoryInfo.pages.length,
                    modifiedTime: categoryInfo.latestDate.modifiedGmt
                }
            });
        })
    });
}