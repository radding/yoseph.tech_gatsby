import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface Palette {
        purpleSunburst: Palette['primary'];
        yellowSunburst: Palette['primary'];
        blueSunburst: Palette['primary'];
    }

    interface PaletteOptions {
        purpleSunburst: PaletteOptions['primary'];
        yellowSunburst: PaletteOptions['primary'];
        blueSunburst: PaletteOptions['primary'];
    }
}

const getRadiantGradient = (...colors: string[]) => {
    return {
        background: `radial-gradient(${colors.join(",")})`,
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
    }
}

// blue sunburst: #fff,#2ed5e9,#2ed5e9)
//Yellow sunburst: #fff,#d6b10d,#d6b10d

export const theme = createTheme({
	spacing: (factor: number) => `${0.25 * factor}rem`, // (Bootstrap strategy)
	typography: {
		fontFamily: "'Poppins', sans-serif;",
		h2: {
			fontFamily: "'Raleway',sans-serif;"
		},
	},
	palette: {
		mode: "dark",
        purpleSunburst: {
            
        },
        blueSunburst: {

        },
        yellowSunburst: {

        },
		primary: {
			dark: "#B42EE9",
			main: "#B42EE9"
		},
		secondary: {
			main: "#C0DA74"
		},
		info: {
			main: "#05A8AA"
		},
		error: {
			main: "#FF595E",
		},
		background: {
			default: "#202625"
		},
	},
    components: {
        MuiTypography: {
            styleOverrides: {
                root: ({theme, ownerState}) => {
                    let background = {};
                    switch (ownerState.color) {
                        case "purpleSunburst":
                            return getRadiantGradient("#fff", "#b42ee9", "#b42ee9");
                        case "yellowSunburst": 
                            return getRadiantGradient("#fff", "#d6b10d", "#d6b10d");
                        case "blueSunburst": 
                            return getRadiantGradient("#fff", "#2ed5e9", "#2ed5e9");
                        default: 
                            return {};
                    }
                }
            }
        }
    }
});