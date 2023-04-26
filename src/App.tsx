import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	ThemeProvider,
	CssBaseline,
	Paper,
	Typography
} from '@mui/material';
import {
	RootRoute,
	Route,
	Router,
	RouterProvider
} from '@tanstack/react-router';
import 'react';
import ButtonLink from './components/ButtonLink';
import theme from './theme';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Rides from './pages/Rides';
import PublishRide from './pages/PublishRide';
import NotFound from './pages/NotFound';
import { FormEvent } from 'react';

const rootRoute = new RootRoute({
	component: () => {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar sx={{ position: 'sticky', background: '#FFFFFF' }}>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<ButtonLink to="/">Home</ButtonLink>
							<ButtonLink to="/profile">Profile</ButtonLink>
							<ButtonLink to="/rides">Rides</ButtonLink>
							<ButtonLink to="/publishRide">Publish ride</ButtonLink>
						</Toolbar>
					</Container>
				</AppBar>
			</ThemeProvider>
		);
	}
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Home
});

const profileRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/profile',
	component: Profile
});

const ridesRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/rides',
	component: Rides
});

const publishRideRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/publishRide',
	component: PublishRide
});

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFound
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	profileRoute,
	ridesRoute,
	publishRideRoute,
	notFoundRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => <RouterProvider router={router} />;

export default App;
