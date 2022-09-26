import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import {
  useAddCabinetMutation,
  useGetCabinetByUidQuery,
} from '../features/api/apiSlice';
import { skipToken } from '@reduxjs/toolkit/query/react';

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  let exception = false;
  const [addCabinet] = useAddCabinetMutation();
  // eslint-disable-next-line no-unused-vars
  const { data: cabinetId } = useGetCabinetByUidQuery(uid ? uid : skipToken);

  useEffect(() => {
    if (user !== null) {
      setUid(user.uid);
    }
  });

  const handleRegister = async (email, password, username) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: username });
      addCabinet({
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      }).unwrap();
      signOut(auth);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const handleLogin = async (email, password, uid) => {
    try {
      const signedIn = await signInWithEmailAndPassword(auth, email, password);
      if (signedIn) {
        // eslint-disable-next-line no-unused-vars
        setUid((uid = auth.currentUser.uid));
      }
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
  const handleReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
      exception = true;
    }
    if (!exception) {
      alert('Check your email for a password reset link');
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
        handleReset,
        cabinetId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
