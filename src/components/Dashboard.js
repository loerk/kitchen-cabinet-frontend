import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'native-base';

const Dashboard = () => {
  return (
    <SafeAreaView>
        <StatusBar barStyle="dark-content" />
      <Text color="green.300">kitchen cabinet</Text>
      <Text color="amber.400">This is a test</Text>
    </SafeAreaView>
  )
}

export default Dashboard;

const styles = StyleSheet.create({});