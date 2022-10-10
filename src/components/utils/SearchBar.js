import { Icon, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const SearchBar = ({ placeholder, onChangeText, defaultValue }) => {
  return (
    <Input
      maxW="300px"
      placeholderTextColor={'grey'}
      size="lg"
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      autoCapitalize="none"
      variant="filled"
      returnKeyType="search"
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
