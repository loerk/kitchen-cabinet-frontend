import {
  Avatar,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import { uuidv4 } from '@firebase/util';

export default function ExpiryList({ title, arr, isLoading, action }) {
  return (
    <Box px={5} pb={7} maxH={500} w={350}>
      <Heading fontSize="xl" p="4" pb="3">
        {title}
      </Heading>
      <FlatList
        pr={3}
        mb={6}
        keyExtractor={() => uuidv4()}
        data={
          arr.sort(
            (a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate)
          ) || null
        }
        renderItem={({ item }) => (
          <Box
            id={uuidv4()}
            borderBottomWidth="1"
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor="muted.800"
            pl={['0', '4']}
            pr={['0', '5']}
            py="1"
          >
            <HStack
              space={[2, 3]}
              justifyContent="space-between"
              alignItems={'center'}
            >
              <Avatar
                size="48px"
                source={{
                  uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                }}
              />
              <VStack>
                <Text
                  w={150}
                  pl={4}
                  isTruncated
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.name}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="center"
              >
                {item.expiryDate.split('-').reverse().join('/')}
              </Text>
            </HStack>
          </Box>
        )}
      />
      {isLoading ? (
        <Button bg="secondary.100" isLoading spinnerPlacement="end"></Button>
      ) : (
        <Button bg="secondary.100" onPress={action}>
          Get Recipes
        </Button>
      )}
    </Box>
  );
}
