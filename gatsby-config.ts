import { GatsbyConfig } from "gatsby";

const metadata = {
		title: `Yoseph.tech`,
		siteUrl: `https://yoseph.tech`

}

// const getLastModified = (data: Queries.MyQuery) => {

// }

const config: GatsbyConfig = {
	siteMetadata: metadata,
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [{
		resolve: 'gatsby-source-wordpress',
		options: {
			"url": "https://content-shuttl.herokuapp.com/yoseph-tech/index.php?graphql",
		}
	}, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
		resolve: 'gatsby-plugin-google-analytics',
		options: {
			"trackingId": "G-RB0PVDWB5R"
		}
	},  {
		resolve: 'gatsby-plugin-manifest',
		options: {
			"icon": "src/images/icon.png"
		}
	}, "gatsby-plugin-mdx", {
		resolve: 'gatsby-source-filesystem',
		options: {
			"name": "images",
			"path": "./src/images/"
		},
		__key: "images"
	}, {
		resolve: 'gatsby-source-filesystem',
		options: {
			"name": "pages",
			"path": "./src/pages/"
		},
		__key: "pages"
	},
 {
	resolve: "gatsby-plugin-sitemap",
	options: {
		resolveSiteUrl: () => metadata.siteUrl,
		query: `
query MyQuery {
  allSitePage {
    nodes {
      path
      pageContext
    }
  }

  allWpPage {
	nodes {
		databaseId
		modifiedGmt
	}
  }
}`,

	resolvePages: ({
		allSitePage:{nodes: sitePages},
		allWpPage: {nodes: wpPages},
	}: any) => {
		return sitePages.map((page: any) => {
			let modifiedTime = page.pageContext.modifiedTime;
			if (modifiedTime === undefined) {
				const wpPage = wpPages.find((wpPage: any) => wpPage.databaseId === page.pageContext.wpID);
				console.log("WP PAGE", wpPages, page.pageContext.wpID);
				modifiedTime = wpPage?.modifiedGmt;
			}
			return {
				...page,
				modifiedTime,
			}
		})
		// 	acc[url] = post;
		// 	return acc;
		// }, {});
	},
	serialize: (post) => {
		return {
			url: post.path,
			lastmod: post.modifiedTime,
		}
	}
	},
 } as any]
};

export default config;
