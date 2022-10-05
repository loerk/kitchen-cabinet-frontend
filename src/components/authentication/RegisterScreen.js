import { Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'native-base';
import { TextInput } from 'react-native-paper';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './AuthStyles';
import { AuthContext } from '../../authNavigation/AuthProvider';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(false);

  const { handleRegister } = useContext(AuthContext);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles.loginContainer}
      >
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
              activeUnderlineColor="#891D47"
              onChangeText={(text) => setUsername(text)}
              autoCapitalize={'none'}
            />
            <TextInput
              style={styles.formInput}
              value={email}
              placeholder={'Email'}
              activeUnderlineColor="#891D47"
              onChangeText={(text) => setEmail(text)}
              autoCapitalize={'none'}
            />
            <TextInput
              style={styles.formInput}
              value={password}
              placeholder={'Password'}
              activeUnderlineColor="#891D47"
              secureTextEntry={!visible}
              right={
                <TextInput.Icon
                  color="#891D47"
                  name={visible ? 'eye' : 'eye-off'}
                  onPress={() => setVisible(!visible)}
                />
              }
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
      </ScrollView>
    </>
  );
};

export default RegisterScreen;
