/* import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import auth from '../../firebase';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';
import { onAuthStateChanged } from 'firebase/auth';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initiliazing, setInitializing] = useState(true);
  //Handle user state changes

  function onAuthStateChanged(user) {
    setUser(user);
    if (initiliazing) setInitializing(false);
    setLoading(false);
  }
  useEffect(()=> {
    const subscriber = onAuthStateChanged(auth, onAuthStateChanged);
    return subscriber;
  }, []);
  if (loading) {
    return <Loading />;
  }
  return ( 
    <NavigationContainer>
        {user ? <Tab.Nav}
    </NavigationContainer>
  )
} */
