import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User,
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBMkYm1K2KKlvXIlFg5epuuweZwC-Qs_Rw',
	authDomain: 'pv247-project-cargo.firebaseapp.com',
	projectId: 'pv247-project-cargo',
	storageBucket: 'pv247-project-cargo.appspot.com',
	messagingSenderId: '687999295366',
	appId: '1:687999295366:web:e8948ef0819865079b1607'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Google sign-in handler
export const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(auth, provider);
};

// Firestore
const db = getFirestore();
