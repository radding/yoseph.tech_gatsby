import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { PostSection } from "../components/posts/PostSection";
import { Layout } from "../components/Layout";
import { RecentPosts } from "../components/posts/RecentPosts";
import { Category, EastOutlined, EastRounded } from "@mui/icons-material";
import { PostCard, isLightPost } from "../components/posts/PostCard";
import { Link } from "../components/Link";

const isString = (thing: unknown): thing is string => {
  return typeof thing === "string" || thing instanceof String;
};

const LightPostSection = ({
  title,
  posts,
  ndx,
  continuation,
}: {
  title: React.ReactElement | string;
  posts: Queries.LightPostsFragment[];
  ndx: number;
  continuation?: React.ReactElement;
}) => (
  <Box>
    <Grid
      container
      direction={ndx % 2 ? "row-reverse" : "row"}
      alignItems={"stretch"}
      sx={{
        marginY: (theme) => theme.spacing(5),
      }}
    >
      <Grid
        item
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingY: (theme) => theme.spacing(10),
        }}
      >
        {isString(title) ? (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", position: "sticky", top: "50%" }}
          >
            {title}
          </Typography>
        ) : (
          title
        )}
      </Grid>
      <Grid item md={6}>
        {posts?.map((post) => (
          <Paper
            sx={{
              padding: (theme) => theme.spacing(3),
              marginBottom: (theme) => theme.spacing(3),
            }}
            key={post!.slug}
          >
            <Link
              isInternal={true}
              link={`/${post!.categories?.nodes![0]?.slug}/${post!.slug}`}
            >
              <Typography variant="h4" component={"h3"}>
                {post!.title}
              </Typography>
            </Link>
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
              <span dangerouslySetInnerHTML={{ __html: post!.excerpt! }}></span>
            </Typography>
            <Box>
              <Box>
                <Link
                  isInternal={true}
                  link={`/${post!.categories?.nodes![0]?.slug}/${post!.slug}`}
                >
                  Continue Reading {post!.title}
                </Link>
              </Box>
            </Box>
          </Paper>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: (theme) => theme.spacing(3),
          }}
        >
          {continuation || null}
        </Box>
      </Grid>
    </Grid>
  </Box>
);

const IndexPage: React.FC<PageProps<Queries.HomepageQuery>> = (props) => {
  return (
    <Layout>
      <Box
        component={"main"}
        sx={{
          paddingX: (theme) => theme.spacing(1),
          marginTop: (theme) => theme.spacing(5),
        }}
      >
        <Grid container>
          <Grid item md={6} flexDirection={{ md: "row-reverse" }}>
            <Box
              sx={(theme) => ({
                position: "sticky",
                top: theme.spacing(30),
              })}
            >
              <Typography
                component={"h1"}
                variant="h2"
                color={"purpleSunburst"}
                sx={{
                  textAlign: "center",
                }}
              >
                {props.data.wpPage?.hero?.title}
              </Typography>
              <Typography
                component={"div"}
                variant="h3"
                sx={{
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{
                  __html: props.data.wpPage?.hero?.content!,
                }}
              />
            </Box>
          </Grid>
          <Grid item md={6}>
            {props.data.recentPosts.nodes.map((post) => {
              return (
                <Paper
                  sx={{
                    padding: (theme) => theme.spacing(3),
                    marginBottom: (theme) => theme.spacing(3),
                  }}
                  key={post.slug}
                >
                  <Link
                    isInternal={true}
                    link={`/${post!.categories?.nodes![0]?.slug}/${post!.slug}`}
                  >
                    <Typography variant="h4" component={"h3"}>
                      {post.title}
                    </Typography>
                  </Link>
                  <Typography variant="subtitle1" component={"h4"}>
                    in{" "}
                    <Link
                      isInternal={true}
                      link={`/${post.categories?.nodes![0]?.slug}`}
                    >
                      {post.categories?.nodes![0]?.name!}
                    </Link>
                  </Typography>
                  <Typography>
                    <span
                      dangerouslySetInnerHTML={{ __html: post.excerpt! }}
                    ></span>
                  </Typography>
                  <Box>
                    <Box>
                      <Link
                        isInternal={true}
                        link={`/${post.categories?.nodes![0]?.slug}/${
                          post.slug
                        }`}
                      >
                        Read {post.title}
                      </Link>
                    </Box>
                  </Box>
                </Paper>
              );
            })}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: (theme) => theme.spacing(3),
              }}
            >
              <Link isInternal={true} link={`/posts`}>
                <Stack direction={"row"}>
                  See all posts <EastRounded />
                </Stack>
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box>
          {props.data.wpPage?.page_sections?.sections?.map((section, ndx) => {
            return (
              <LightPostSection
                title={section?.title!}
                posts={
                  section
                    ?.posts!.map((post) => post?.post)
                    .filter<Queries.LightPostsFragment>(isLightPost)!
                }
                ndx={ndx}
                key={section?.title}
              />
            );
          })}
          {props.data.categories.nodes
            .filter((category) => {
              return category.posts?.nodes && category.posts?.nodes?.length > 0;
            })
            .map((category, ndx) => {
              return (
                <LightPostSection
                  title={`The Latest in ${category.name}`}
                  posts={category.posts?.nodes!.slice(0, 6) as any}
                  ndx={ndx}
                  key={category.slug}
                  continuation={
                    <Link isInternal={true} link={`/${category.slug}`}>
                      <Stack direction={"row"}>
                        See all in {category.name} <EastRounded />
                      </Stack>
                    </Link>
                  }
                />
              );
            })}
        </Box>
      </Box>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query Homepage {
    wpPage(databaseId: { eq: 183 }) {
      title
      hero {
        title
        content
      }
      pages {
        excerpt
      }
      page_sections {
        sections {
          title
          posts {
            post {
              __typename
              ... on WpPost {
                ...LightPosts
              }
            }
          }
        }
      }
    }

    recentPosts: allWpPost(limit: 6, sort: { date: DESC }) {
      nodes {
        ...LightPosts
      }
    }

    categories: allWpCategory(
      filter: { slug: { nin: ["oscon", "uncategorized"] } }
    ) {
      nodes {
        slug
        name
        posts {
          nodes {
            ...LightPosts
          }
        }
      }
    }
  }
`;

export const Head: HeadFC<Queries.HomepageQuery> = (props) => (
  <>
    <title>Welcome to Yoseph.tech</title>
    <meta
      name="description"
      content={props.data.wpPage?.pages?.excerpt ?? "Welcome to Yoseph.tech"}
    />
  </>
);
