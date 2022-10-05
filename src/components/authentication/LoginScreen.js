import { Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'native-base';
import { TextInput } from 'react-native-paper';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './AuthStyles';
import { AuthContext } from '../../authNavigation/AuthProvider';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.loginContainer}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={styles.loginContainer}
        >
          <View style={styles.loginHeader}>
            <Image
              style={styles.loginHeaderLogo}
              source={require('../../../assets/images/icon.png')}
            />
            <Text style={styles.loginHeaderText}>{'The Kitchen Cabinet'}</Text>
          </View>
          <View style={styles.loginWrapper}>
            <View style={styles.form}>
              <TextInput
                style={styles.formInput}
                value={email}
                activeUnderlineColor="#891D47"
                placeholder={'Email Address'}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
              />
              <TextInput
                style={styles.formInput}
                value={password}
                placeholder={'Password'}
                secureTextEntry={!visible}
                activeUnderlineColor="#891D47"
                right={
                  <TextInput.Icon
                    color="#891D47"
                    name={visible ? 'eye' : 'eye-off'}
                    onPress={() => setVisible(!visible)}
                  />
                }
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity onPress={() => handleLogin(email, password)}>
                <View style={styles.button}>
                  <Text style={styles.buttonLabel}>{'Sign in'}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword')}
              >
                <Text style={styles.loginResetText}>
                  {'Forgot your Password? '}
                  <Text style={styles.loginResetLink}>{'Reset Password '}</Text>
                </Text>
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
        </ScrollView>
      </View>
    </>
  );
};

export default LoginScreen;
