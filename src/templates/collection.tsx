import React from "react";
import { Layout } from "../components/Layout";
import { Link, PageProps, graphql, navigate } from "gatsby";
import {
  Box,
  Container,
  List,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { GatsbyImage } from "gatsby-plugin-image";
import { PostList } from "../components/posts/PostSection";

enum PageType {
  Tag = "Tag",
  Category = "Category",
  Post = "Post",
}

interface PageContext {
  slug: string;
  pageType: PageType;
  posts: number[];
  pageNumber: number;
  numberOfPages: number;
}

export default (props: PageProps<Queries.CollectionQuery, PageContext>) => {
  let details: { description?: string | null; name?: string | null } | null = {
    description: "These are all my recent posts.",
    name: "All Posts",
  };
  if (props.pageContext.pageType === PageType.Tag) {
    details = props.data.tag;
  } else if (props.pageContext.pageType === PageType.Category) {
    details = props.data.category;
  }
  // const details = props.pageContext.isTag ? props.data.tag : props.data.category;
  return (
    <Layout>
      <Box
        sx={{ paddingY: (theme) => theme.spacing(5) }}
        borderBottom={"1px solid black"}
      >
        <Container>
          <Box sx={{ textAlign: "center" }}>
            <Typography component="h1" variant="h3">
              {details?.name}
            </Typography>
            <Box marginTop={(theme) => theme.spacing(3)}>
              <div
                dangerouslySetInnerHTML={{ __html: details?.description! }}
              ></div>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container>
        <List>
          <PostList
            posts={props.data.posts.nodes! as Queries.LightPostsFragment[]}
          />
        </List>
      </Container>
      <Container>
        <Stack alignItems={"center"}>
          <Pagination
            count={props.pageContext.numberOfPages}
            hideNextButton={
              props.pageContext.pageNumber === props.pageContext.numberOfPages
            }
            hidePrevButton={props.pageContext.pageNumber === 1}
            page={props.pageContext.pageNumber}
            onChange={(_, value) => {
              console.log(value);
              let basePath = "";
              if (props.pageContext.pageType === PageType.Tag) {
                basePath = `/tags/${props.pageContext.slug}`;
              } else if (props.pageContext.pageType === PageType.Category) {
                basePath = `/${props.pageContext.slug}`;
              } else {
                basePath = "/posts";
              }
              //   const basePath = props.pageContext.isTag
              //     ? `/tags/${props.pageContext.slug}`
              //     : `/${props.pageContext.slug}`;
              if (value === 1) {
                navigate(`${basePath}`);
              } else {
                navigate(`${basePath}/${value}`);
              }
            }}
          />
        </Stack>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query Collection($posts: [Int], $slug: String) {
    tag: wpTag(slug: { eq: $slug }) {
      name
      description
    }
    category: wpCategory(slug: { eq: $slug }) {
      name
      description
    }
    posts: allWpPost(filter: { databaseId: { in: $posts } }) {
      nodes {
        ...LightPosts
      }
    }
  }
`;
