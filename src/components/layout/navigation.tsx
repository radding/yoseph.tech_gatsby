import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, Drawer, ListItem, List } from "@mui/material";
import React from "react";
import { FullLogo } from "./FullLogo";
import { Link as GatsbyLink, graphql, useStaticQuery } from "gatsby";
import { Link } from "../Link";
import MenuIcon from '@mui/icons-material/Menu';
import ReactCardFlip from "react-card-flip";
import { CloseSharp } from "@mui/icons-material";

const drawerSize = "35vw";

export const Navigation = () => {
	const details = useStaticQuery(graphql`query MyQuery {
		wpHeader(databaseId: {eq: 34}) {
			header {
				links {
					isInternal
					link
					text
				}
			}
		}
	}`);

	// const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElNav, setAnchorElNav] = React.useState<boolean>(false);

	// const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
	// 	setAnchorElNav(event.currentTarget);
	// };

	const toggleOpenNav = () => setAnchorElNav(!anchorElNav);

	const handleCloseNavMenu = () => {
		setAnchorElNav(false);
	};

	return (
		<>
			<AppBar sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1, position: {
					md: "static",
					xs: "fixed",
				}
			}}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={toggleOpenNav}
								color="inherit"
							>
								<ReactCardFlip isFlipped={anchorElNav} flipDirection="horizontal">
									<MenuIcon />
									<CloseSharp />
								</ReactCardFlip>
							</IconButton>
						</Box>
						<GatsbyLink to="/" aria-label="Home Page Link">
							<FullLogo />
						</GatsbyLink>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{details.wpHeader.header.links.map((link: { isInternal: boolean, text: string, link: string }) => (
								<Box
									sx={theme => ({
										marginLeft: theme.spacing(5),
									})}
									key={link.link}
								>
									<Link {...link} sx={theme => ({
										color: theme.palette.getContrastText(theme.palette.primary.main),
									})} />
								</Box>
							))}
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<Drawer
				anchor={"left"}
				open={Boolean(anchorElNav)}
				onClose={handleCloseNavMenu}
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
					{details.wpHeader.header.links.map((link: { isInternal: boolean, text: string, link: string }) => (
						<ListItem
							key={link.link}
						>
							<Link {...link} sx={theme => ({
							})} />
						</ListItem>
					))}
				</List>

			</Drawer>
		</>
	);
}