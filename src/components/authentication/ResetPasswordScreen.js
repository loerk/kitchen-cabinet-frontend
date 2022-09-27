import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { ScrollView } from 'native-base';
import { TextInput } from 'react-native-paper';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './AuthStyles';
import { AuthContext } from '../../authNavigation/AuthProvider';
import theme from '../../theme';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const { handleReset } = useContext(AuthContext);

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
              value={email}
              activeUnderlineColor="#891D47"
              placeholder={'Email Address'}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />
            <TouchableOpacity onPress={() => handleReset(email)}>
              <View style={styles.button}>
                <Text style={styles.buttonLabel}>{'Reset Password'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.returnLogin}>
                {''}
                <Text style={styles.returnLoginLink}>{'  Back to Login '}</Text>
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
    </>
  );
};

export default ResetPasswordScreen;
