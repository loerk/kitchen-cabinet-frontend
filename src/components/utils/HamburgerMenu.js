import { Box, HamburgerIcon, Menu, Text, useColorMode } from 'native-base';
import React from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const HamburgerMenu = ({ options }) => {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Menu
        w="190"
        mr={4}
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <HamburgerIcon
                size={28}
                mr={40}
                color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
              />
            </Pressable>
          );
        }}
      >
        {options.map((option) => (
          <Menu.Item key={uuidv4()} onPress={() => navigation.navigate(option)}>
            <Text size={'md'}>{option}</Text>
          </Menu.Item>
        ))}
      </Menu>
    </Box>
  );
};
