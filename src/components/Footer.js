import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Text,
  Icon,
  HStack,
  Center,
  Pressable,
  useDisclose,
  Actionsheet,
} from 'native-base';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { CabinetAddItemForm } from './cabinet/CabinetAddItemForm';

const Footer = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclose();

  const cabinetId = '6315f1e0801fa7692c1bb736';
  return (
    <Box width="100%" maxW="100%" alignSelf="stretch">
      <Center flex={1}></Center>
      <HStack bg="green.600" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => {
            setSelected(0);
            navigation.navigate('Cabinet');
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialIcons name={selected === 0 ? 'kitchen' : 'kitchen'} />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Cabinet
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            setSelected(1);
            navigation.navigate('Recipes');
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={<MaterialIcons name="search" />}
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Search
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={1}
          py="3"
          flex={1}
          onPress={onOpen}
        >
          <Center>
            <Icon
              mb="1"
              as={<AntDesign size={24} color="black" name="pluscircleo" />}
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Add
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            setSelected(2);
            navigation.navigate('Shopping List');
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 2 ? 'cart' : 'cart-outline'}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Shopping List
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            setSelected(3);
            navigation.navigate('Profile');
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 3 ? 'account' : 'account-outline'}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Profile
            </Text>
          </Center>
        </Pressable>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <CabinetAddItemForm cabinetId={cabinetId} />
          </Actionsheet.Content>
        </Actionsheet>
      </HStack>
    </Box>
  );
};

export default Footer;
