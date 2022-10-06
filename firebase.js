// Import the functions
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
/* import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from '@env'; */

// Firebase configuration
const firebaseConfig = {
  apiKey: 'FIREBASE_',
  authDomain: 'FIREBASE_',
  projectId: 'FIREBASE_',
  storageBucket: 'FIREBASE_',
  messagingSenderId: 'FIREBASE_',
  appId: 'FIREBASE_',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
