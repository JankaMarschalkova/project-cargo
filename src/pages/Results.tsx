import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { Button, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';

const Resultsa = () => {
	usePageTitle('Results');

	const user = useLoggedInUser();

	const navigate = useNavigate();

	return (
		<>
			<Typography variant="h2" fontWeight="bold">
				Results
			</Typography>
			<Button variant="contained" onClick={() => navigate({ to: '/' })}>
				Go back
			</Button>
		</>
	);
};

export default Resultsa;
