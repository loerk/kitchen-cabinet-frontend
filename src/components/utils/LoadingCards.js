import { Center, Skeleton, VStack } from 'native-base';
import React from 'react';

export default function LoadingCards() {
  return (
    <Center my={9}>
      <VStack
        w="90%"
        maxW="400"
        maxH={400}
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'secondary.100',
        }}
        _light={{
          borderColor: 'secondary.100',
        }}
      >
        <Skeleton w={300} />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="secondary.100" />
      </VStack>
    </Center>
  );
}
