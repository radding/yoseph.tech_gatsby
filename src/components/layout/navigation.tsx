import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, Drawer, ListItem, List, Grid } from "@mui/material";
import React from "react";
import { FullLogo } from "./FullLogo";
import { Link as GatsbyLink, graphql, useStaticQuery } from "gatsby";
import { Link } from "../Link";
import MenuIcon from '@mui/icons-material/Menu';
import ReactCardFlip from "react-card-flip";
import { CloseSharp } from "@mui/icons-material";

const drawerSize = "35vw";

export interface NavigationProps {
	currentPath?: string;
}

export const Navigation = (props: NavigationProps) => {
	const details = useStaticQuery<Queries.NavigationQuery>(graphql`query Navigation {
		centerNav: wpHeader(databaseId: {eq: 34}) {
			header {
				links {
					isInternal
					link
					text
				}
			}
		}
	}`);

	const [anchorElNav, setAnchorElNav] = React.useState<boolean>(false);

	const toggleOpenNav = () => setAnchorElNav(!anchorElNav);

	const handleCloseNavMenu = () => {
		setAnchorElNav(false);
	};

	return (
		<>
			<AppBar sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1, 
				position: {
					md: "static",
					xs: "fixed",
				},
			}}>
				<Container maxWidth="xl" sx={theme => ({
					[theme.breakpoints.up("md")]: {
						paddingY: theme.spacing(4)
					}
				})}>
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="Toggle Mobile nav Menu"
								aria-controls="menu-appbar"
								onClick={toggleOpenNav}
								color="inherit"
							>
								<ReactCardFlip isFlipped={anchorElNav} flipDirection="horizontal">
									<MenuIcon />
									<CloseSharp />
								</ReactCardFlip>
							</IconButton>
						</Box>
						<Grid container justifyContent={"space-between"} alignItems={"center"}>
							<Grid item>
								<GatsbyLink to="/" aria-label="Home Page Link">
									<FullLogo />
								</GatsbyLink>
							</Grid>
							<Grid item>
								<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
									{details.centerNav!.header!.links!.map((link) => (
										<Box
											sx={theme => ({
												marginLeft: theme.spacing(5),
											})}
											key={link!.link}
										>
											<Link {...link!} sx={theme => {
												console.log(`${props.currentPath} === ${link?.link}`);
												return {
												color: theme.palette.getContrastText(theme.palette.primary.main),
												"> hr": {
													border: props.currentPath === link?.link ? "1px solid" : "hidden",
													height: "2px"
												},
												":hover": {
													textDecoration: "none",
													"> hr": {
														border: "1px solid"
													}
												}
											}}}>
												{link!.text}
												<hr />
											</Link>
										</Box>
									))}
								</Box>
							</Grid>
						</Grid>
					</Toolbar>
				</Container>
			</AppBar>
			<Drawer
				anchor={"left"}
				open={Boolean(anchorElNav)}
				onClose={handleCloseNavMenu}
				id="menu-appbar"
				sx={{
					display: { md: 'none' },
					width: drawerSize,
					top: theme => theme.mixins.toolbar.height || theme.mixins.toolbar.minHeight,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerSize,
						boxSizing: "border-box",
						top: theme => theme.mixins.toolbar.height || theme.mixins.toolbar.minHeight,
					}
				}}
			>
				<List>
					{details.centerNav!.header!.links!.map((link) => (
						<ListItem
							key={link!.link}
						>
							<Link {...link!}>{link!.text}</Link>
						</ListItem>
					))}
				</List>

			</Drawer>
		</>
	);
}