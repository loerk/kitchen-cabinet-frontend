import { Box, HamburgerIcon, Menu } from 'native-base';
import React from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';
export const HamburgerMenu = ({ options }) => {
  console.log(options);
  const navigation = useNavigation();
  return (
    <Box w="90%" alignItems="center">
      <Menu
        w="190"
        mr={4}
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <HamburgerIcon size={28} mr={40} />
            </Pressable>
          );
        }}
      >
        {options.map((option) => (
          <Menu.Item key={'6543'} onPress={() => navigation.navigate(option)}>
            {option}
          </Menu.Item>
        ))}
      </Menu>
    </Box>
  );
};
