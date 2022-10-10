// Import the functions
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';

/* import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} from '@env'; */

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDi0UyinfXI3wH0H7Gul4w1wiCe0k-2aEg',
  authDomain: 'kitchen-cabinet-361713.firebaseapp.com',
  projectId: 'kitchen-cabinet-361713',
  storageBucket: 'kitchen-cabinet-361713.appspot.com',
  messagingSenderId: '1027337546172',
  appId: '1:1027337546172:web:5a6bac9e210d5ee117a3b9',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
