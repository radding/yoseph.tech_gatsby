import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { PostCard, isLightPost } from "./PostCard";
import { Link as GatsbyLink } from "gatsby";
import { ImageList, List, ListItem, Paper, Stack } from "@mui/material";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { Link } from "../Link";

interface PostSectionProps {
    title?: string | null; 
    posts?: unknown[] | null;
    variant: "paper" | "image",
    continuation?: {
        url: string,
        linkText: React.ReactElement,
    }
}

export const PostList = (props: {posts: Queries.LightPostsFragment[]}) => (
<List>
    {props.posts.map(post => (
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
);

export const PostSection = (props: PostSectionProps) => (
<>
				<Box sx={{
                }}>
					<Typography component={"h3"} variant="h2" sx={{
                        paddingY: theme => theme.spacing(7),
                    }}>{props?.title}</Typography>
				</Box>
                {props.variant === "paper" && (
                    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
                        {props?.posts?.map((post) => {
                            // const realPost = post?.post;
                            if (isLightPost(post)) {
                                return (<Grid item md={4}><PostCard post={post} variant="paper" /></Grid>)
                            }
                            return null;
                        })}
                    </Grid>
                )}
                {props.variant === "image" &&(

                    <ImageList variant="quilted"
                        cols={4}
                        rowHeight={100}
                    >
                        {props.posts?.map(post => {
                            if(isLightPost(post)) {
                                return <PostCard post={post} variant="image" rows={3}/>
                            }
                            return null;
                        }) as any}
                                    {/* {props?.posts?.map((post) => {
                                        // const realPost = post?.post;
                                        if (isLightPost(post)) {
                                            return (<PostCard post={post} variant="paper" />)
                                        }
                                        return null;
                                    })} */}
                    </ImageList>
                    // <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
                    // </Grid>
                )}
                {props.continuation && (<Box sx={{
                    display: "flex",
                    justifyContent: "flex-end", 
                }}>
                    <Link component={GatsbyLink} to={props.continuation.url}>
                        <Stack  direction="row" alignItems="center" gap={1}>
                            {props.continuation.linkText}
                            <EastRoundedIcon sx={{
                                paddingLeft: theme => theme.spacing(3)
                            }}/>
                        </Stack>
                    </Link>
                </Box>)}
</>
)