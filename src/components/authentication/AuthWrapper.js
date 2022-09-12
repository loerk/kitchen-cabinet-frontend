import { Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import styles from './AuthStyles';

export const LoginScreen = () => {
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
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
