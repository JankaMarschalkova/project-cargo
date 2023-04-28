import {
	AppBar,
	Container,
	Toolbar,
	ThemeProvider,
	CssBaseline,
	Box,
} from '@mui/material';
import {
	Outlet,
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
import ProfileIcon from '@mui/icons-material/Person2Sharp';


const rootRoute = new RootRoute({
	component: () => {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar sx={{ position: 'sticky', background: '#FFFFFF' }}>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<ButtonLink to="/">Home</ButtonLink>
							<ButtonLink to="/your-rides">Your rides</ButtonLink>
							<ButtonLink to="/publish-ride">Publish ride</ButtonLink>

							<Box sx={{ flexGrow: 1 }} />
							<ButtonLink to="/profile">			
								<ProfileIcon />
							</ButtonLink>
						</Toolbar>
					</Container>
				</AppBar>

				<Container
					maxWidth="sm"
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						flexGrow: 1,
						gap: 2,
						my: 4
					}}
				>
					<Outlet />
				</Container>
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
	path: '/your-rides',
	component: Rides
});

const publishRideRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/publish-ride',
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
