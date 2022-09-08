// Import the functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

export const auth = getAuth(app);
