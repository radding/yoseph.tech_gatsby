import React from "react";
import {
  Box,
  ImageListItem,
  ImageListItemBar,
  Link as MuiLink,
  Paper,
  Typography,
} from "@mui/material";
import { Link as GatsbyLink, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "../Link";
import { DateTime } from "luxon";

interface PostProps {
  post: Queries.LightPostsFragment;
  cols?: number;
  rows?: number;
  mobileCols?: number;
  mobileRows?: number;
  variant: "paper" | "image";
}

const PaperCard = (props: Pick<PostProps, "post">) => {
  return (
    <Paper
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        [theme.breakpoints.up("md")]: {
          padding: theme.spacing(2),
        },
        [`&:hover`]: {},
      })}
    >
      <GatsbyImage
        image={props.post.featuredImage?.node?.largeImage!}
        alt={props.post.featuredImage?.node?.altText!}
        style={{ height: "60%", width: "100%" }}
        imgStyle={{ objectFit: "contain" }}
      />
      <Box>
        <Typography variant="h4" sx={{ textDecoration: "underline" }}>
          {props.post.title}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          In{" "}
          {props.post.categories?.nodes?.map((node) => node?.name).join(", ")}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: props.post.excerpt! }}></div>
      </Box>
    </Paper>
  );
};

const ImageCard = (
  props: Pick<PostProps, "post" | "cols" | "rows" | "mobileCols" | "mobileRows">
) => {
  return (
    <>
      <ImageListItem
        key={props.post.id}
        cols={props.mobileCols || 4}
        rows={props.mobileRows || 1}
        sx={(theme) => ({
          overflow: "hidden",
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
          [theme.breakpoints.down("md")]: {
            display: "block",
          },
        })}
      >
        <Link
          isInternal={true}
          link={`/${props.post.categories?.nodes![0]?.slug}/${props.post.slug}`}
        >
          <GatsbyImage
            image={props.post.featuredImage?.node?.largeImage!}
            alt={props.post.featuredImage?.node?.altText!}
            style={{ overflow: "hidden" }}
          />
          <ImageListItemBar
            sx={{
              overflow: "initial",
              whiteSpace: "normal",
            }}
            title={
              <>
                {props.post.title}
                <Typography
                  component="span"
                  sx={{
                    fontSize: ".825rem",
                  }}
                >
                  {" "}
                  - published{" "}
                  {DateTime.fromISO(props.post.date!).toLocaleString()}
                </Typography>
              </>
            }
            subtitle={
              <span
                style={{ whiteSpace: "normal" }}
                dangerouslySetInnerHTML={{ __html: props.post.excerpt! }}
              />
            }
          />
        </Link>
      </ImageListItem>
      <ImageListItem
        key={props.post.id}
        cols={props.cols || 1}
        rows={props.rows || 1}
        sx={(theme) => ({
          overflow: "hidden",
          [theme.breakpoints.up("md")]: {
            display: "block",
          },
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        })}
      >
        <Link
          isInternal={true}
          link={`/${props.post.categories?.nodes![0]?.slug}/${props.post.slug}`}
        >
          <GatsbyImage
            image={props.post.featuredImage?.node?.largeImage!}
            alt={props.post.featuredImage?.node?.altText!}
            style={{ overflow: "hidden" }}
          />
          <ImageListItemBar
            sx={{
              overflow: "initial",
              whiteSpace: "normal",
            }}
            title={
              <>
                {props.post.title}
                <Typography
                  component="span"
                  sx={{
                    fontSize: ".825rem",
                  }}
                >
                  {" "}
                  - published{" "}
                  {DateTime.fromISO(props.post.date!).toLocaleString()}
                </Typography>
              </>
            }
            subtitle={
              <span
                style={{ whiteSpace: "normal" }}
                dangerouslySetInnerHTML={{ __html: props.post.excerpt! }}
              />
            }
          />
        </Link>
      </ImageListItem>
    </>
  );
};

export const PostCard = (props: PostProps) => {
  const categorySlug = props.post.categories?.nodes![0]?.slug!;
  const postSlug = props.post.slug!;
  if (props.variant === "paper") {
    return (
      <MuiLink
        component={GatsbyLink}
        to={`/${categorySlug}/${postSlug}`}
        sx={{ textDecoration: "none" }}
      >
        <PaperCard post={props.post} />
      </MuiLink>
    );
  }
  return <ImageCard post={props.post} cols={props.cols} rows={props.rows} />;
};

export const isLightPost = (
  maybePost?: unknown
): maybePost is Queries.LightPostsFragment => {
  if (maybePost !== undefined) {
    return (maybePost as any).__typename === "WpPost";
  }
  return false;
};

export const fragment = graphql`
  fragment LightPosts on WpPost {
    id
    __typename
    date
    slug
    title
    excerpt
    featuredImage {
      node {
        altText
        # smallImage: gatsbyImage(width: 150, layout: FULL_WIDTH)
        # mediumImage: gatsbyImage(width: 300)
        # largeImage: gatsbyImage(width: 1200, layout: FULL_WIDTH)
      }
    }
    tags {
      nodes {
        name
        slug
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
  }
`;
