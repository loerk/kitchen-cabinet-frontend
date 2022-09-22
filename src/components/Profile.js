import { StyleSheet, Dimensions } from 'react-native';
import {
  HStack,
  Switch,
  useColorMode,
  Text,
  Button,
  VStack,
} from 'native-base';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
//Authentication
import { AuthContext } from '../authNavigation/AuthProvider';

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
    <>
      <HStack style={styles.headerContainer}>
        <Text>Profile</Text>
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
    </>
  );
};

export default Profile;
