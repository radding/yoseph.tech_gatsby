import * as React from "react"
import { HeadFC, PageProps, graphql } from "gatsby"
import { AppBar, Box, Container } from "@mui/material"
import { Navigation } from "../components/layout/navigation"

const IndexPage: React.FC<PageProps> = () => {
	return (
		<Container component="main">
			<Box>
				<h1>Welcome to Yoseph.tech</h1>
			</Box>
		</Container>
	)
}

export default IndexPage

// export const pageQuery = graphql`

// query stuff {
//   featured: allWpPost(sort: {order: DESC, fields: date}, limit: 1, filter: {tags: {elemMatch: {slug: {eq: "homepage-feature"}}}}) {
//     edges {
//       node {
//         excerpt
//         slug
//         title
//         categories {
//           name
//           slug
//           description
//         }
//         date
//         status
//         sticky
//         featured_media {
//           source_url
//           alt_text
// localFile {
//         childImageSharp {
//           fluid (maxWidth: 450){
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//         }
//       }
//     }
//   }

//   mostPopular: allWpPost(sort: {order: DESC, fields: date}, limit: 6, filter: {tags: {elemMatch: {slug: {eq: "popular"}}}}) {
//     edges {
//       node {
//         excerpt
//         slug
//         title
//         categories {
//           name
//           slug
//           description
//         }
//         date
//         status
//         sticky
//         featured_media {
//           source_url
//           alt_text
// localFile {
//         childImageSharp {
//           fluid (maxWidth: 450){
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//         }
//       }
//     }
//   }

//   mostRecent: allWpPost(sort: {order: DESC, fields: date}, limit: 6, filter: {}) {
//     edges {
//       node {
//         excerpt
//         slug
//         title
//         categories {
//           name
//           slug
//           description
//         }
//         date
//         status
//         sticky
//         featured_media {
//           source_url
//           alt_text
// localFile {
//         childImageSharp {
//           fluid(maxWidth: 450) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//         }
//       }
//     }
//   }
// }

// `

export const Head: HeadFC = () => <title>Home Page</title>
