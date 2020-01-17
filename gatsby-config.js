module.exports = {
  siteMetadata: {
    title: `Yoseph.Tech`,
    description: `Blogging and technology ideas`,
    author: `@yosephradding`,
    siteUrl: `https://www.yoseph.tech`
  },

  plugins: [

    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-plugin-amp`,
      options: {
        analytics: {
          type: 'gtag',
          dataCredentials: 'include',
          config: {
            vars: {
              gtag_id: "",
              config: {
                "": {
                  page_location: '{{ pathname }}'
                },
              },
            },
          },
        },
        canonicalBaseUrl: 'http://www.example.com/',
        components: ['amp-form'],
        excludedPaths: ['/404*', '/'],
        pathIdentifier: '/amp/',
        relAmpHtmlPattern: '{{ canonicalBaseUrl }}{{ pathname }}{{ pathIdentifier }}',
        useAmpClientIdApi: true,
      },
    },

    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.yoseph.tech/',
        sitemap: 'https://www.yoseph.tech/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },

    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
                      site {
                      siteMetadata {
                      title
                description
                    siteUrl
                    site_url: siteUrl
                  }
                }
              }
            `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressPost } }) => {
              return allWordpressPost.edges.map(edge => ({
                ...edge.node,
                description: edge.node.excerpt,
                url: `${site.siteMetadata.siteUrl}/${edge.node.categories[0].slug}/${edge.node.slug}`,
                guid: `${site.siteMetadata.siteUrl}/${edge.node.categories[0].slug}/${edge.node.slug}`,
                custom_elements: [{ "content:encoded": edge.node.content }],
                category: edge.node.categories[0].name,
              }));
            },
            query: `
          {
                      allWordpressPost {
                      edges {
                      node {
                      title
                  content
                    date
                    excerpt
                    slug
                  featured_media {
                      source_url
                    }
                    tags {
                      name
                    slug
                  }
                  categories {
                      name
                    slug
                    description
                  }
                }
              }
            }
          }
          `,
            output: "/rss.xml",
            title: "Yoseph.Tech RSS Feed"
          },
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `content-shuttl.herokuapp.com/yoseph-tech`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true

        // name: `gatsby-starter-default`,
        // short_name: `starter`,
        // start_url: `/`,
        // background_color: `#663399`,
        // theme_color: `#663399`,
        // display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
