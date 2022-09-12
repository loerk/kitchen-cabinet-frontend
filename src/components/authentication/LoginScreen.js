import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './AuthStyles';
// import firebase functions
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

// import Authentication Screens
// import RegisterScreen from './RegisterScreen';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser);
    setUser(currentUser);
    console.log(user);
    if (currentUser) {
      console.log('user logged in:', user);
    }
  });

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  // to be used when configuring signOut functionality in user profile // will need to import signOut from firebase/auth
  // <button onPress={handleLogout}>
  /*   const handleLogout = async () => {
    await signOut(auth);:
  }; */
  // Logged in status
  // <Text> Logged in as: <Text/> {user?.email}

  return (
    <>
      <SafeAreaView style={styles.loginContainer}>
        <View style={styles.loginHeader}>
          <Image
            style={styles.loginHeaderLogo}
            source={require('../../../assets/images/placeholder-logo.png')}
          />
          <Text style={styles.loginHeaderText}>{'The Kitchen Cabinet'}</Text>
        </View>
        <View style={styles.loginWrapper}>
          <View style={styles.form}>
            <TextInput
              style={styles.formInput}
              value={email}
              placeholder={'Email Address'}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />
            <TextInput
              style={styles.formInput}
              value={password}
              placeholder={'Password'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={() => handleLogin()}>
              <View style={styles.button}>
                <Text style={styles.buttonLabel}>{'Sign in'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.loginFooterText}>
                {"Don't have an account? "}
                <Text style={styles.loginFooterLink}>{'Register'}</Text>
              </Text>
            </TouchableOpacity>
          </>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
