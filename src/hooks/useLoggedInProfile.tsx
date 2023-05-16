import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react';

import { Profile, profilesCollection } from '../firebase';
import { onSnapshot } from 'firebase/firestore';
import useLoggedInUser from './useLoggedInUser';

const ProfileContext = createContext<Profile | undefined>(undefined);

export const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
	// Hold profile info in state
	const user = useLoggedInUser();
	const [profile, setProfile] = useState<Profile | undefined>(undefined);

	useEffect(() => {
		if (!user?.email) {
			return;
		}

		onSnapshot(profilesCollection, snapshot => {
			const profiles = snapshot.docs.map(doc => doc.data());
			setProfile(
				profiles.find(profile => profile.email === user?.email) ?? undefined
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<ProfileContext.Provider value={profile}>
			{children}
		</ProfileContext.Provider>
	);
};

// Hook providing logged in user information
const useLoggedInProfile = () => useContext(ProfileContext);

// eslint-disable-next-line react-refresh/only-export-components
export default useLoggedInProfile;
