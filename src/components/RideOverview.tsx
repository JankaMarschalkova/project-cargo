import {
	Box,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogContent,
	Grid,
	Typography
} from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';
import {
	Profile as ProfileType,
	Ride as RideType,
	profilesCollection
} from '../firebase';
import DriverPreview from './DriverPreview';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import RideStatus from './RideStatus';
import { loadProfile } from '../pages/profile/Profile';

export interface SimpleDialogProps {
	open: boolean;
	selectedValue: string;
	onClose: (value: string) => void;
}

const RideOverview = ({
	ride,
	isPassenger = true
}: {
	ride: RideType;
	isPassenger?: boolean;
}) => {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');
	const [profile, setProfile] = useState<ProfileType | null>(null);

	useEffect(() => {
		if (!ride?.driver) return;

		onSnapshot(profilesCollection, snapshot => {
			setProfile(loadProfile(ride.driver ?? '', snapshot));
		});
	}, [ride.driver]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
		setSelectedValue(value);
	};

	const SimpleDialog = (props: SimpleDialogProps) => {
		const { onClose, selectedValue, open } = props;

		const handleClose = () => {
			onClose(selectedValue);
		};

		return (
			<Dialog onClose={handleClose} open={open}>
				<DialogContent>
					<DriverPreview profile={profile} />
				</DialogContent>
				<Grid sx={{ mx: 3, mb: 3, alignItems: 'stretch' }}>
					<Button
						variant="outlined"
						onClick={handleClose}
						sx={{ width: '100%' }}
					>
						<BackIcon sx={{ marginRight: '0.4em' }} />
						Back
					</Button>
				</Grid>
			</Dialog>
		);
	};

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left',
				my: 2,
				background: '#CFD8DC'
			}}
		>
			<CardContent>
				<Typography variant="h6" color="#4F4F4F" fontSize={16}>
					On{' '}
					{new Date(ride.datetime).toLocaleString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						hour12: true
					})}
				</Typography>
				<Box mb={2}>
					<Typography variant="h5" fontWeight="bold" mt={1} mb={2}>
						From {ride.leaving_from} to {ride.going_to}
					</Typography>
					<Typography>Price per person: {ride.price_per_person} €</Typography>

					{isPassenger && (
						<>
							<Typography display="flex" alignItems="center">
								Driver:{' '}
								<Button
									sx={{ textTransform: 'none', fontSize: 16 }}
									onClick={handleClickOpen}
								>
									{ride.driver}
								</Button>
							</Typography>
							<SimpleDialog
								selectedValue={selectedValue}
								open={open}
								onClose={handleClose}
							/>
						</>
					)}
					{!isPassenger && (
						<>
							<Typography>Available seats: {ride.seats_available}</Typography>
							<Typography>
								Passengers:{' '}
								{ride.passengers.length == 0
									? '(no passengers)'
									: ride.passengers.join(', ')}
							</Typography>
						</>
					)}
				</Box>

				{ride.note && (
					<Typography mb={2.5} color="#4F4F4F" fontSize={16}>
						{ride.note}
					</Typography>
				)}

				<Box display="flex" alignItems="center">
					<RideStatus ride={ride} isPassenger={isPassenger} profile={profile} />
				</Box>
			</CardContent>
		</Card>
	);
};

export default RideOverview;
