import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// custom theme
import customTheme from './src/theme';

// stack navigator
import AppNavigator from './AppNavigator';

// redux
import { Provider } from 'react-redux';
import store from './src/app/store';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
