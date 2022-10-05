import { StyleSheet, Dimensions } from 'react-native';
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
//Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

const SettingsScreen = () => {
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
        <Text bold>Dark Mode</Text>
        <Switch
          defaultIsChecked={isDarkMode}
          offTrackColor="secondary.200"
          onTrackColor="secondary.100"
          onThumbColor="secondary.100"
          offThumbColor="secondary.200"
          value={isDarkMode}
          onValueChange={toggleSwitch}
        />
      </HStack>
      <VStack alignItems="center">
        <Button mt={10} bg="secondary.100" onPress={() => handleLogout()}>
          Logout
        </Button>
      </VStack>
    </View>
  );
};

export default SettingsScreen;
