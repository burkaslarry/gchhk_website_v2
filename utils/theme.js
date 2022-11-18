import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#08c",
		},
		secondary: {
			light: '#0066ff',
			main: '#0044ff',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#ffcc00',
		},
		success: {
			main: '#2e7d32',
		},
	},
});
