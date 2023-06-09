import {
	AppBar,
	Container,
	Toolbar,
	ThemeProvider,
	CssBaseline,
	Box,
	Hidden
} from '@mui/material';
import {
	Outlet,
	RootRoute,
	Route,
	Router,
	RouterProvider
} from '@tanstack/react-router';
import ButtonLink from './components/ButtonLink';
import theme from './theme';
import Home from './pages/ride/Home';
import Profile from './pages/profile/Profile';
import YourRides from './pages/ride/YourRides';
import PublishRide from './pages/ride/PublishRide';
import NotFound from './pages/NotFound';
import ProfileIcon from '@mui/icons-material/Person2Sharp';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useLoggedInUser, { UserProvider } from './hooks/useLoggedInUser';
import Results from './pages/ride/Results';

const rootRoute = new RootRoute({
	component: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const user = useLoggedInUser();
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar sx={{ position: 'sticky', background: '#FFFFFF' }}>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<Hidden mdDown>
								<ButtonLink to="/">
									<img src="./logo.png" alt="CarGo logo" width="48" />
								</ButtonLink>
							</Hidden>

							<ButtonLink to="/">Home</ButtonLink>

							<Hidden mdDown>
								<ButtonLink to="/your-rides">Your rides</ButtonLink>
								<ButtonLink to="/publish-ride">Publish ride</ButtonLink>
							</Hidden>

							<Hidden mdUp>
								<ButtonLink to="/your-rides">Rides</ButtonLink>
								<ButtonLink to="/publish-ride">Publish</ButtonLink>
							</Hidden>

							<Box sx={{ flexGrow: 1 }} />
							<ButtonLink to="/profile">
								{user ? <ProfileIcon /> : 'Login'}
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

const resultsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/results',
	component: Results
});

const profileRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/profile',
	component: Profile
});

const ridesRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/your-rides',
	component: YourRides
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
	resultsRoute,
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

const App = () => (
	<UserProvider>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<RouterProvider router={router} />
		</LocalizationProvider>
	</UserProvider>
);

export default App;
