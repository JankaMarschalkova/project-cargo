import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: { main: '#469597' },
        background: {default: '#E5E3E4'},
        text: { primary: '#FFFFFF'},
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
