import React from "react";
import { Layout } from "../components/Layout";
import {
  Box,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { graphql, PageProps } from "gatsby";
import { DateTime } from "luxon";
import { Link } from "../components/Link";
import { GatsbyImage } from "gatsby-plugin-image";
import { RecentPosts } from "../components/posts/RecentPosts";

export default (props: PageProps<Queries.PostQuery>) => {
  const datePosted = DateTime.fromISO(props.data.wpPost?.date!);
  const category = props.data.wpPost?.categories?.nodes![0]!;
  return (
    <Layout>
      <Box sx={{ paddingY: (theme) => theme.spacing(3) }} bgcolor={"#4d4d4d"}>
        <Container>
          <Box sx={{ textAlign: "center" }}>
            <GatsbyImage
              image={props.data.wpPost?.featuredImage?.node?.gatsbyImage!}
              alt={props.data.wpPost?.featuredImage?.node?.altText!}
              imgStyle={{ objectFit: "contain" }}
            />
            <Typography component="h1" variant="h3" color={"blueSunburst"}>
              {props.data.wpPost?.title}
            </Typography>
            <Typography component={"h3"} variant="h5">
              posted in{" "}
              <Link isInternal link={`/${category.slug}`}>
                {category.name}
              </Link>{" "}
              on {datePosted.toLocaleString()}
            </Typography>
            <Box marginY={(theme) => theme.spacing(5)}>
              {props.data.wpPost?.tags?.nodes!.map((tag) => (
                <Link
                  isInternal
                  link={`/tags/${tag?.slug}`}
                  sx={{ marginRight: (theme) => theme.spacing(3) }}
                >
                  {tag?.name!}
                </Link>
              ))}
            </Box>
            <Box>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.data.wpPost?.excerpt!,
                }}
              ></div>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container>
        <div
          dangerouslySetInnerHTML={{ __html: props.data.wpPost?.content! }}
        ></div>
      </Container>
      <Container>
        <Box>
          <Typography variant="h3" component={"h3"}>
            Related Posts:
          </Typography>
          <List>
            {props.data.wpPost?.relatedPosts?.nodes?.map((post) => (
              <ListItem key={post!.slug}>
                <Paper
                  sx={{
                    padding: (theme) => theme.spacing(3),
                    marginBottom: (theme) => theme.spacing(3),
                    width: "100%",
                  }}
                >
                  <Typography variant="h4" component={"h3"}>
                    {post!.title}
                  </Typography>
                  <Typography variant="subtitle1" component={"h4"}>
                    in{" "}
                    <Link
                      isInternal={true}
                      link={`/${post!.categories?.nodes![0]?.slug}`}
                    >
                      {post!.categories?.nodes![0]?.name!}
                    </Link>
                  </Typography>
                  <Typography>
                    <span
                      dangerouslySetInnerHTML={{ __html: post!.excerpt! }}
                    ></span>
                  </Typography>
                  <Box>
                    <Box>
                      <Link
                        isInternal={true}
                        link={`/${post!.categories?.nodes![0]?.slug}/${
                          post!.slug
                        }`}
                      >
                        Read more
                      </Link>
                    </Box>
                  </Box>
                </Paper>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Typography variant="h3" component={"h3"}>
            Recent Posts:
          </Typography>
          <RecentPosts style="list" />
        </Box>
      </Container>
    </Layout>
  );
};
export const pageQuery = graphql`
  query Post($databaseID: Int!) {
    wpPost(databaseId: { eq: $databaseID }) {
      title
      excerpt
      content
      date
      tags {
        nodes {
          slug
          name
        }
      }
      categories {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          altText
          gatsbyImage(width: 1201)
        }
      }
      relatedPosts {
        nodes {
          ...LightPosts
        }
      }
    }
  }
`;
