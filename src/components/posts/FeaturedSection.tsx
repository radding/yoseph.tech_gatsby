import { ImageList } from "@mui/material";
import React from "react";
import { PostCard } from "./PostCard";

interface FeaturedProps {
    posts: Queries.LightPostsFragment[];
}

export const FeaturedSection = (props: FeaturedProps) => {
    return (
        <ImageList variant="quilted"
            cols={4}
            rowHeight={100}
        >
            <PostCard post={props.posts[0]} variant="image" cols={3} rows={6} />
            {props.posts.slice(1, 4).map(post => (
                <PostCard post={post} variant="image" cols={1} rows={2} />
            ))}
        </ImageList>
    )
}