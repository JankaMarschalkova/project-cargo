import {
	Box,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogActions,
	DialogTitle,
	Typography
} from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Ride as RideType } from '../firebase';
import DriverPreview from './DriverPreview';
import { useState } from 'react';
import { SimpleDialogProps } from '../pages/Profile';

const RidePreview = ({
	ride,
	isPassenger = true
}: {
	ride: RideType;
	isPassenger?: boolean;
}) => {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');
	const openDriverInfo = () => {
		<DriverPreview profile={ride.driver} />;
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
		setSelectedValue(value);
	};

	function SimpleDialog(props: SimpleDialogProps) {
		const { onClose, selectedValue, open } = props;

		const handleClose = () => {
			onClose(selectedValue);
		};

		return (
			<Dialog onClose={handleClose} open={open} maxWidth="xs">
				<DialogTitle>Driver profile</DialogTitle>
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>
						<BackIcon sx={{ marginRight: '0.4em' }} />
						Back
					</Button>
				</DialogActions>
				<DriverPreview profile={ride.driver} />
			</Dialog>
		);
	}

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left',
				my: 2,
				background: '#D5D5D5'
			}}
		>
			<CardContent>
				<Typography variant="h6" fontSize={16}>
					{new Date(ride.datetime).toLocaleString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						hour12: true
					})}
				</Typography>
				<Box>
					<Typography variant="h5" fontWeight="bold" mt={1} mb={2}>
						From {ride.leaving_from} to {ride.going_to}
					</Typography>
					<Typography>Price per person: {ride.price_per_person} €</Typography>

					{isPassenger && (
						<Typography>
							Driver:{' '}
							<Button onClick={handleClickOpen}>{ride.driver.nickname}</Button>
						</Typography>
					)}
					{!isPassenger && (
						<>
							<Typography>Available seats: {ride.seats_available}</Typography>
							<Typography>
								Passengers:{' '}
								{ride.passengers.length == 0
									? '(none)'
									: ride.passengers.join(', ')}
							</Typography>
						</>
					)}
				</Box>
				{ride.note && (
					<Typography mt={2} fontStyle="italic">
						{ride.note}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};

export default RidePreview;
