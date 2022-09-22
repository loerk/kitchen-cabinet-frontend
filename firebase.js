// Import the functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
/* import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from '@env'; */
FIREBASE_API_KEY = 'AIzaSyDi0UyinfXI3wH0H7Gul4w1wiCe0k-2aEg';
FIREBASE_AUTH_DOMAIN = 'kitchen-cabinet-361713.firebaseapp.com';
FIREBASE_PROJECT_ID = 'kitchen-cabinet-361713';
FIREBASE_STORAGE_BUCKET = 'kitchen-cabinet-361713.appspot.com';
FIREBASE_MESSAGING_SENDER_ID = '1027337546172';
FIREBASE_APP_ID = '1:1027337546172:web:5a6bac9e210d5ee117a3b9';

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
