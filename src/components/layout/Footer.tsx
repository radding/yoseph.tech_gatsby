import { Box, Container, Grid, List, ListItem, Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Link } from "../Link";

export const Footer = () => {
     const footer = useStaticQuery<Queries.FooterQuery>(graphql`query Footer{
    wpFooter(databaseId: {eq: 35}) {
    acfFooterData {
        about {
          title
          content
        }
        column {
          links {
            isInternal
            text
            link
          }
          title
        }
      }
    }
}
  `);
    return (
        <Container sx={{
            borderTop: "1px solid black"
        }}>
           <Grid container justifyContent={"space-between"} sx={{
            margin: theme => `${theme.spacing(12)} 0`
           }}>
                {footer.wpFooter?.acfFooterData?.column?.map((col, ndx) => (
                    <Grid item key={ndx} md={4}>
                        <Typography variant="subtitle1" component={"h5"}>
                           {col?.title!} 
                        </Typography>
                        <List>
                            {col?.links!.map(link => (
                                <ListItem><Link {...link!}>{link?.text!}</Link></ListItem>
                            ))}
                        </List>
                    </Grid>
                ))}
                <Grid item md={4}>
                    <Typography variant="subtitle1" component={"h5"}>
                        {footer.wpFooter?.acfFooterData?.about?.title}
                    </Typography>
                    <Box>
                        <div dangerouslySetInnerHTML={{__html: footer.wpFooter?.acfFooterData?.about?.content!}} />
                    </Box>
                </Grid>
            </Grid> 
        </Container>
    )
}