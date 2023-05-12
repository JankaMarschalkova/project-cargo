import {
	Box,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogActions,
	Typography
} from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Profile, Ride as RideType, profilesCollection } from '../firebase';
import DriverPreview from './DriverPreview';
import { useEffect, useState } from 'react';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { onSnapshot } from 'firebase/firestore';
import RideStatus from './RideStatus';

export interface SimpleDialogProps {
	open: boolean;
	selectedValue: string;
	onClose: (value: string) => void;
}

const RidePreview = ({
	ride,
	isPassenger = true
}: {
	ride: RideType;
	isPassenger?: boolean;
}) => {
	const user = useLoggedInUser();
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		if (!user?.email) {
			return;
		}

		onSnapshot(profilesCollection, snapshot => {
			const profiles = snapshot.docs.map(doc => doc.data());
			setProfile(
				profiles.find(profile => profile.email === user?.email) ?? null
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

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
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>
						<BackIcon sx={{ marginRight: '0.4em' }} />
						Back
					</Button>
				</DialogActions>
				<DriverPreview profile={profile} />
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
							<Typography>
								Driver: <Button onClick={handleClickOpen}>{ride.driver}</Button>
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
					<Typography mb={2} fontStyle="italic">
						{ride.note}
					</Typography>
				)}
				
				<Box display='flex'>
					<RideStatus is_cancelled={ride.is_cancelled} />
				</Box>
			</CardContent>
		</Card>
	);
};

export default RidePreview;
