import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: { main: '#469597' },
		background: { default: '#C4BCC0' },
		text: { primary: '#2F2F2F' },
		mode: 'light'
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				// Css rule that makes sure app is always 100% height of window
				'body, #root': {
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh'
				}
			}
		}
	}
});

export default theme;
