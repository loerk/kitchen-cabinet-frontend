import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/authentication/LoginScreen';
import RegisterScreen from '../components/authentication/RegisterScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
