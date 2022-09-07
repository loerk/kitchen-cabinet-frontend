import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, StatusBar, useColorMode, Input } from 'native-base';

// components
import Header from './Header';

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'green' : 'white';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar
        barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Header />
      <Divider />
      {/* <Text color="green.300">kitchen cabinet</Text>
      <Text color="amber.400">This is a test</Text> */}
      {/* */}
      <Input />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
