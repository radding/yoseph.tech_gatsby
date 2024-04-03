import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { PostSection } from "./PostSection";
import { Box, ImageList, ImageListItem, ImageListItemBar, List, ListItem, Paper, Typography } from "@mui/material";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "../Link";
import { DateTime } from "luxon";
import { PostCard } from "./PostCard";
import { FeaturedSection } from "./FeaturedSection";
import post from "../../templates/post";

interface RecentPostsProps {
    limit?: number
    style?: "large_image" | "line" | "list"
    continuation?: {
        link: string;
        linkElement: React.ReactElement;
    }
}

export const RecentPosts = ({limit = 6, style="line", continuation}: RecentPostsProps) => {
    const data = useStaticQuery<Queries.RecentPostsQuery>(graphql`query RecentPosts {
        recentPosts: allWpPost(limit: 6, sort:{date:DESC}) {
            nodes {
                ...LightPosts
            }
        } 
    }`);
    const recentPosts = data.recentPosts.nodes!.slice(0, limit);
    if (style === "line") {
        return <PostSection variant="image" title={"Recent Posts"} posts={recentPosts as any} />
    } else if (style === "list") {
        return (
            <List>
                {recentPosts?.map(post => (
                    <ListItem key={post!.slug}>
                        <Paper sx={{padding: theme=> theme.spacing(3), marginBottom: theme=> theme.spacing(3), width: "100%"}} >
                            <Typography variant="h4" component={"h3"}>{post!.title}</Typography>
                            <Typography variant="subtitle1" component={"h4"}>in{" "}
                                <Link isInternal={true} link={`/${post!.categories?.nodes![0]?.slug}`}>{post!.categories?.nodes![0]?.name!}</Link>
                            </Typography>
                            <Typography><span dangerouslySetInnerHTML={{__html: post!.excerpt!}}></span></Typography>
                            <Box>
                                <Box>
                                    <Link isInternal={true} link={`/${post!.categories?.nodes![0]?.slug}/${post!.slug}`}>Read more</Link>
                                </Box>
                            </Box>
                        </Paper>
                    </ListItem>
                ))}
            </List>
        )
    }
    return (
        <>
            <FeaturedSection posts={recentPosts} />
            {continuation && <Box sx={{display: "flex", justifyContent: "flex-end", paddingY: theme => theme.spacing(3)}}>
                <Link link={continuation.link} isInternal={true}>{continuation.linkElement}</Link>
            </Box>}
        </>
    )
}
