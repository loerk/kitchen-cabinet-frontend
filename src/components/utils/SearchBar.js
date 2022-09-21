import { VStack, Box, Divider, Icon, Input, useTheme } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

// eslint-disable-next-line react/prop-types
const SearchBar = ({ placeholder, onChangeText, defaultValue }) => {
  const { colors } = useTheme();
  return (
    <VStack
      my="4"
      space={5}
      w="100%"
      maxW="300px"
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }
    >
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          size="lg"
          placeholder={placeholder}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          autoCapitalize="none"
          variant="filled"
          width="100%"
          /*        borderRadius="10" */
          py="4"
          px="2"
          InputLeftElement={
            <Icon
              ml="2"
              size="5"
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>
    </VStack>
  );
};

export default SearchBar;
