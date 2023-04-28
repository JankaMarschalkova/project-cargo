import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const Home = () => {
	usePageTitle('Home');
	
	return (
		<>
			<Typography variant="h2">Home</Typography>
		</>
	);
};

export default Home;
