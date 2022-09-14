import {
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

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin } = useContext(AuthContext);

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
            <TouchableOpacity onPress={() => handleLogin(email, password)}>
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
