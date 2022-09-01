import React from 'react';
import { Box, Text, Icon, HStack, Center, Pressable } from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const Footer = () => {
  const [selected, setSelected] = React.useState(1);
  return (
    <Box flex={1} bg="white" safeAreaTop width="100%" maxW="100%" alignSelf="stretch">
    <Center flex={1}></Center>
    <HStack bg="green.600" alignItems="center" safeAreaBottom shadow={6}>
      <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
        <Center>
          <Icon mb="1" as={<MaterialIcons name={selected === 0 ? 'kitchen' : 'kitchen'} />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Cabinet
          </Text>
        </Center>
      </Pressable>
      <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
        <Center>
          <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Search
          </Text>
        </Center>
      </Pressable>
      <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
        <Center>
          <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'cart' : 'cart-outline'} />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Shopping List
          </Text>
        </Center>
      </Pressable>
      <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
        <Center>
          <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            Profile
          </Text>
        </Center>
      </Pressable>
    </HStack>
  </Box>
  )
}

export default Footer;