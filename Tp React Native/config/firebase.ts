import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDSxMM5L0_BVFnqB4Rms2fpkcLZwKOl5rU",
  authDomain: "gsb-support.firebaseapp.com",
  projectId: "gsb-support",
  storageBucket: "gsb-support.firebasestorage.app",
  messagingSenderId: "469372660263",
  appId: "1:469372660263:web:102e51eb3bea7c2ebffc02"
};

// Initialize Firebase only once
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with proper error handling
let auth: Auth;
try {
  auth = getAuth(app);
} catch (error) {
  // If getAuth fails, try initializeAuth
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth };
export const db = getFirestore(app);
export default app