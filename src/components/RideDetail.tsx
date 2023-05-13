import {
	Box,
	Button,
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
import { SimpleDialogProps } from './RidePreview';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const RideDetail = ({
	ride,
	username
}: {
	ride: RideType;
	username: string;
}) => {
	const joinRide = () => {
		console.log('Join'); // TODO
	};

	const leaveRide = () => {
		console.log('Leave'); // TODO
	};

	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');
	const [profile, setProfile] = useState<ProfileType | null>(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
		setSelectedValue(value);
	};

	useEffect(() => {
		if (!ride.driver) {
			return;
		}

		onSnapshot(profilesCollection, snapshot => {
			const profiles = snapshot.docs.map(doc => doc.data());
			setProfile(
				profiles.find(profile => profile.email === ride.driver) ?? null
			);
		});
	}, [ride.driver]);

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
		<Grid
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left',
				my: 2
			}}
		>
			<Typography variant="h6" fontWeight="bold" mb={0.5}>
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
			<Box>
				<Typography>
					Available seats: {ride.seats_available - ride.passengers.length}
				</Typography>

				<Typography>Price per person: {ride.price_per_person} €</Typography>

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
			</Box>
			{ride.note && (
				<Typography mt={2} fontStyle="italic">
					{ride.note}
				</Typography>
			)}

			{username && dayjs(ride.datetime) >= dayjs() && (
				<Box>
					{ride.passengers.includes(username) ? (
						<Button
							variant="contained"
							onClick={leaveRide}
							sx={{
								'my': 1.5,
								'background': '#E53935',
								':hover': { background: '#E53935' }
							}}
						>
							Leave ride
						</Button>
					) : (
						<Button variant="contained" onClick={joinRide} sx={{ my: 1.5 }}>
							Join ride
						</Button>
					)}
				</Box>
			)}
		</Grid>
	);
};

export default RideDetail;
