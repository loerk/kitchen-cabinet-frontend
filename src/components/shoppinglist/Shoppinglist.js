import {
  Box,
  HStack,
  Pressable,
  Text,
  useColorMode,
  View,
  Icon,
  Avatar,
  Spinner,
  Heading,
  useToast,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import React, { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import {
  useAddItemMutation,
  useDeleteShoppinglistItemsMutation,
  useGetShoppinglistQuery,
} from '../../features/api/apiSlice';
import { AuthContext } from '../../authNavigation/AuthProvider';
import { addWeeks } from '../../helpers/getDefaultExpiryDate';

const ShoppingList = () => {
  const { cabinetId } = useContext(AuthContext);
  const toast = useToast();
  const [
    deleteShoppinglistItems,
    { isSuccess: isSuccessDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteShoppinglistItemsMutation();
  const [
    addItem,
    { isSuccess: isSuccessAdd, isError: isErrorAdd, error: errorAdd },
  ] = useAddItemMutation();

  const { data: shoppinglist, isLoading } = useGetShoppinglistQuery(cabinetId);
  const { colorMode } = useColorMode();
  const [listData, setListData] = useState([]);
  const initialActionItem = { id: null, add: false, delete: false };
  const [actionItem, setActionItem] = useState(initialActionItem);
  const [actionItemId, setActionItemId] = useState(null);
  const [toDelete, setToDelete] = useState(false);
  const [toAdd, setToAdd] = useState(false);
  useEffect(() => {
    if (shoppinglist) {
      const keyShoppinglist = shoppinglist.map((item, index) => ({
        ...item,
        key: index,
      }));
      setListData(keyShoppinglist);
    }
  }, [shoppinglist]);
  const addSetting = (id) => {
    setActionItemId(id);
    setToAdd(true);
    setToDelete(false);
  };
  const deleteSetting = (id) => {
    setActionItemId(id);
    setToDelete(true);
    setToAdd(false);
  };
  useEffect(() => {
    if (toDelete && actionItemId) {
      deleteShoppinglistItems({ cabinetId, toDelete: actionItemId });
      setToDelete(false);
      setToAdd(false);
      setActionItemId(null);
    }
    if (toAdd && actionItemId) {
      const payload = { cabinetId, id: actionItemId, expiryDate: addWeeks(2) };
      addItem(payload).unwrap();
      setToAdd(false);
      setToDelete(true);
    }
    if (isSuccessAdd)
      setActionItem({ ...actionItem, add: false, delete: true });
  }, [actionItemId, toDelete, toAdd]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    const targetItem = newData.splice(prevIndex, 1);
    setListData(newData);
    setActionItemId(targetItem[0].id);
  };

  const renderItem = ({ item }) => (
    <Box>
      <Pressable
        bg={colorMode === 'dark' ? '#515050' : '#FCF5EA'}
        alignItems="center"
        borderBottomColor="trueGray.200"
        borderBottomWidth={1}
        justifyContent="center"
        height={50}
        underlayColor={'#AAA'}
        py={8}
      >
        <HStack width="100%" px={4}>
          <HStack
            space={2}
            alignItems="center"
            justifyContent={'space-between'}
          >
            {item.image ? (
              <Avatar
                source={{
                  uri: item.image,
                }}
                alt={item.name}
              />
            ) : (
              <Avatar color="white" bg={'secondary.800'}>
                {item?.name?.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Box h={7} w={'80%'}>
              <HStack flex={1} justifyContent={'space-between'}>
                <Text maxW={180} isTruncated>
                  {item?.name}
                </Text>
                <Text>
                  {Number(item.amount.toFixed(2)) +
                    '  ' +
                    (item.metrics !== undefined
                      ? item.metrics
                      : item.unit === 'tablespoon' ||
                        item.unit === 'tablespoons'
                      ? 'tbsp'
                      : item.unit)}
                </Text>
              </HStack>
            </Box>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1} pl={2}>
      <Pressable
        px={4}
        cursor="pointer"
        bg="#891D47"
        justifyContent="center"
        onPress={() => {
          deleteRow(rowMap, data.item.key);
          addSetting(data.item.id);
          toast.show({
            render: () => {
              return (
                <Box
                  bg={isErrorAdd ? 'error.300' : 'success.300'}
                  px="2"
                  py="1"
                  shadow={3}
                  rounded="sm"
                  mb={8}
                >
                  {isLoading ? (
                    <Spinner />
                  ) : !isErrorAdd ? (
                    'You successfully added this item.'
                  ) : (
                    'Sorry, something went wrong'
                  )}
                </Box>
              );
            },
          });
        }}
      >
        <Icon
          as={<AntDesign name="pluscircleo" size={'lg'} color="white" />}
          color="white"
          ml={5}
        />
      </Pressable>
      <Pressable
        px={4}
        mr="auto"
        bg="#891D47"
        justifyContent="center"
        onPress={() => {
          deleteRow(rowMap, data.item.key);
          deleteSetting(data.item.id);
        }}
      ></Pressable>
      <Pressable
        px={4}
        ml="auto"
        bg="black"
        justifyContent="center"
        onPress={() => {
          deleteRow(rowMap, data.item.key);
          deleteSetting(data.item.id);
        }}
      ></Pressable>
      <Pressable
        px={4}
        cursor="pointer"
        bg="black"
        justifyContent="center"
        onPress={() => {
          deleteRow(rowMap, data.item.key);
          deleteSetting(data.item.id);
          toast.show({
            render: () => {
              return (
                <Box
                  bg={isErrorDelete ? 'error.300' : 'success.300'}
                  px="2"
                  py="1"
                  shadow={3}
                  rounded="sm"
                  mb={8}
                >
                  {isLoading ? (
                    <Spinner />
                  ) : !isErrorDelete ? (
                    'You successfully deleted this item'
                  ) : (
                    'Sorry, something went wrong'
                  )}
                </Box>
              );
            },
          });
        }}
      >
        <Icon
          as={<AntDesign name="delete" size={'lg'} />}
          color="white"
          mr={6}
        />
      </Pressable>
    </HStack>
  );

  if (isLoading) return <Spinner />;

  return (
    <View>
      <Heading mt={5}>Shopping List</Heading>
      <HStack ml={5} mt={2}>
        <Text italic fontSize="sm">
          <AntDesign
            name="arrowleft"
            size={24}
            color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
          />
        </Text>
        <Text px={4} italic fontSize="sm">
          swipe
        </Text>
        <Text italic fontSize="sm">
          <AntDesign
            name="arrowright"
            size={24}
            color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
          />
        </Text>
      </HStack>
      {listData.length ? (
        <Box textAlign="center" flex={1} safeAreaTop>
          <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-98}
            leftOpenValue={98}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        </Box>
      ) : (
        <Text mt={10} textAlign={'center'}>
          Your Shopping List is empty.
        </Text>
      )}
    </View>
  );
};

export default ShoppingList;
