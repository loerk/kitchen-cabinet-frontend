import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Animated from 'react-native-reanimated';

/* const Profile = ({ state, descriptors, navigation, position }) => {
  return (

  );
};

export default Profile; */

/* import { StyleSheet, Dimensions } from 'react-native';
import {
  HStack,
  Switch,
  useColorMode,const Profile = ({ state, descriptors, navigation, position }) => {
  return (

  );
};

export default Profile;
  Text,
  Button,
  VStack,
  View,
} from 'native-base';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
//Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

const Profile = () => {
  const { handleLogout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const toggleSwitch = () => {
    toggleColorMode(() => {});
  };

  const { width, height } = Dimensions.get('screen');
  const styles = StyleSheet.create({
    headerContainer: {
      width: width,
      height: 0.1 * height,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
  });import { StyleSheet, Dimensions } from 'react-native';
import {
  HStack,
  Switch,
  useColorMode,
  Text,
  Button,
  VStack,
  View,
} from 'native-base';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
//Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

const Profile = () => {
  const { handleLogout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const toggleSwitch = () => {
    toggleColorMode(() => {});
  };

  const { width, height } = Dimensions.get('screen');
  const styles = StyleSheet.create({
    headerContainer: {
      width: width,
      height: 0.1 * height,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
  });

  return (
    <View>
      <HStack style={styles.headerContainer}>
        <Text>Dark Mode</Text>
        <Switch
          defaultIsChecked={isDarkMode}
          offTrackColor="black.800"
          onTrackColor="primary.200"
          onThumbColor="black.800"
          offThumbColor="primary.200"
          value={isDarkMode}
          onValueChange={toggleSwitch}
        />
      </HStack>
      <VStack alignItems="center">
        <Button onPress={() => handleLogout()}>Logout</Button>
      </VStack>
    </View>
  );
};

export default Profile;


  return (
    <View>
      <HStack style={styles.headerContainer}>
        <Text>Dark Mode</Text>
        <Switch
          defaultIsChecked={isDarkMode}
          offTrackColor="black.800"
          onTrackColor="primary.200"
          onThumbColor="black.800"
          offThumbColor="primary.200"
          value={isDarkMode}
          onValueChange={toggleSwitch}
        />
      </HStack>
      <VStack alignItems="center">
        <Button onPress={() => handleLogout()}>Logout</Button>
      </VStack>
    </View>
  );
};

export default Profile;
 */
