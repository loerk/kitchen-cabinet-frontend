import { StyleSheet, Dimensions } from 'react-native';
import { HStack, Switch, useColorMode, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Profile = () => {
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
        <TouchableOpacity onPress={() => handleLogOut()}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>{'Logout'}</Text>
          </View>
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

export default Profile;
