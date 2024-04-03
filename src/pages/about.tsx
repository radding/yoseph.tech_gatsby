import { Box, Container, Typography } from "@mui/material";
import { PageProps, graphql } from "gatsby";
import React from "react";
import { Layout } from "../components/Layout";
import { RecentPosts } from "../components/posts/RecentPosts";

export default (props: PageProps<Queries.AboutMeQuery>) => {
    return (
        <Layout currentPath="/about">
            <main>
                <Box sx={{
                    backgroundColor: theme => theme.palette.grey[100]
                }}>
                    <Container>
                        <Typography variant="h1" component={"h1"} sx={{
                            padding: theme => `${theme.spacing(12)} 0`,
                        }}>{props.data.wpPage?.title}</Typography>
                    </Container>
                </Box>
                <Container>
                    <Box>
                        <div dangerouslySetInnerHTML={{__html: props.data.wpPage?.content!}}/>
                    </Box>
                    <Box>
                        <RecentPosts limit={3}/>
                    </Box>
                </Container>
            </main>
        </Layout>
    );
}

export const pageQuery = graphql`query AboutMe {
    wpPage(databaseId: {eq: 39}) {
        title
        content
    }

}`