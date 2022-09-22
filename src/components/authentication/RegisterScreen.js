import {
  Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './AuthStyles';
import { AuthContext } from '../../authNavigation/AuthProvider';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { handleRegister } = useContext(AuthContext);

  // Old Version
  /* const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const uid = user.uid;
        console.log(uid);
        Alert.alert(
          'Your account has been created!',

          'You can now log in'
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }; */

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
              value={username}
              placeholder={'Username'}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize={'none'}
            />
            <TextInput
              style={styles.formInput}
              value={email}
              placeholder={'Email'}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize={'none'}
            />
            <TextInput
              style={styles.formInput}
              value={password}
              placeholder={'Password'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => handleRegister(email, password, username)}
            >
              <View style={styles.button}>
                <Text style={styles.buttonLabel}>{'Register'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginFooterText}>
                {'Already have an account? '}
                <Text style={styles.loginFooterLink}>{'Log In'}</Text>
              </Text>
            </TouchableOpacity>
          </>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RegisterScreen;
