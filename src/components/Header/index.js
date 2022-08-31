import React from 'react';
import { styles } from './styles';
import { Heading, HStack, Switch, useColorMode } from 'native-base';

const Header = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const toggleSwitch = () => {
    toggleColorMode();
  }

  return (
    <HStack style={styles.headerContainer}>
      <Heading>Dashboard</Heading>
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
  )
};

export default Header;