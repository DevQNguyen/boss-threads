import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDWYWeeJHbu8biaQD9C0IN4Wm-y0llL1Jc',
	authDomain: 'bossthreads-db.firebaseapp.com',
	databaseURL: 'https://bossthreads-db.firebaseio.com',
	projectId: 'bossthreads-db',
	storageBucket: 'bossthreads-db.appspot.com',
	messagingSenderId: '620031064401',
	appId: '1:620031064401:web:7b08630037bf65c5623b70'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Query firestore and create a document
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;
	console.log(userAuth);
	// Querying the documentReference of a specific user
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	// Get the snapshot object of that user
	const snapShot = await userRef.get();
	console.log(snapShot);

	// If snapShot doesn't exists, create a new user document object
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		// If no user data, create new user
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('Error creating user:', error.message);
		}
	}
	console.log(userRef);
	return userRef;
};

// Create an instance of the GoogleAuthProvider
const provider = new firebase.auth.GoogleAuthProvider();
// Always prompt to select account to use for authentication in popup
provider.setCustomParameters({ prompt: 'select_account' });

// For use with onClick. Create a popup that uses the Google provider for signing in
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
