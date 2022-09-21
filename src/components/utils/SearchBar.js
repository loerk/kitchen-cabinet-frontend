import { VStack, Box, Divider, Icon, Input, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

// eslint-disable-next-line react/prop-types
const SearchBar = ({ placeholder, onChangeText, defaultValue }) => {
  return (
    <Input
      w="70%"
      maxW="300px"
      backgroundColor={'#891D4710'}
      placeholderTextColor={'grey'}
      size="lg"
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      autoCapitalize="none"
      variant="filled"
      /*        borderRadius="10" */
      py="4"
      InputLeftElement={
        <Icon
          ml="2"
          size="5"
          color="grey"
          as={<Ionicons name="ios-search" />}
        />
      }
    />
  );
};

export default SearchBar;
