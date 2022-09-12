import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import React, { createContext, useState } from 'react';
import { auth } from '../../firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (error) {
            alert(error.message);
            console.log(error.message);
          }
        },
        handleRegister: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
          } catch (error) {
            alert(error.message);
            console.log(error.message);
          }
        },
        handleLogout: async () => {
          try {
            await signOut(auth);
          } catch (error) {
            alert(error.message);
            console.log(error.message);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
