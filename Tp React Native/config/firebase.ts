// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const isEasBuild = process.env.EAS_BUILD_PLATFORM !== undefined;

const firebaseConfig = {
  apiKey: isEasBuild
  ? process.env.FIREBASE_API_KEY
  : process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
authDomain: isEasBuild
  ? process.env.FIREBASE_AUTH_DOMAIN
  : process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
projectId: isEasBuild
  ? process.env.FIREBASE_PROJECT_ID
  : process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
storageBucket: isEasBuild
  ? process.env.FIREBASE_STORAGE_BUCKET
  : process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
messagingSenderId: isEasBuild
  ? process.env.FIREBASE_MESSAGING_SENDER_ID
  : process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
appId: isEasBuild
  ? process.env.FIREBASE_APP_ID
  : process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: isEasBuild
  ? process.env.FIREBASE_MEASUREMENT_ID
  :process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service

const auth = initializeAuth(app, {
  persistence:getReactNativePersistence(AsyncStorage),
})


const db = getFirestore(app);

export {auth, db};
// export const auth = getAuth(app);