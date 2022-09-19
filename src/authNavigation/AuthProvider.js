import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, { createContext, useState } from 'react';
import { auth } from '../../firebase';
import { useAddCabinetMutation } from '../features/api/apiSlice';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [addCabinet] = useAddCabinetMutation();

  const handleRegister = async (email, password, username) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: username });
      console.log(newUser);
      addCabinet({
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      }).unwrap();
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
