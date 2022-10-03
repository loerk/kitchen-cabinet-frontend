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
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import React, { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import {
  useDeleteShoppinglistItemsMutation,
  useGetShoppinglistQuery,
} from '../../features/api/apiSlice';
import { AuthContext } from '../../authNavigation/AuthProvider';

const ShoppingList = () => {
  const { cabinetId } = useContext(AuthContext);
  const [deleteShoppinglistItems, { isSuccess, isError, error }] =
    useDeleteShoppinglistItemsMutation({ cabinetId, toDelete });
  const { data: shoppinglist, isLoading } = useGetShoppinglistQuery(cabinetId);
  const { colorMode } = useColorMode();
  const [listData, setListData] = useState([]);
  const [toDelete, setToDelete] = useState([]);
  console.log(shoppinglist);
  useEffect(() => {
    if (shoppinglist) {
      const keyShoppinglist = shoppinglist.map((item, index) => ({
        ...item,
        key: index,
      }));
      setListData(keyShoppinglist);
    }
  }, [shoppinglist]);

  useEffect(() => {
    if (toDelete.length) deleteShoppinglistItems({ cabinetId, toDelete });
    if (isSuccess) setToDelete([]);
    if (isError) console.log(error);
  }, [toDelete]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    const deletedItem = newData.splice(prevIndex, 1);
    const id = deletedItem[0].id;
    setListData(newData);
    setToDelete((prev) => [...prev, id]);
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
            <Avatar color="white" bg={'secondary.800'}>
              {item?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box h={7} w={'80%'}>
              <HStack flex={1} justifyContent={'space-between'}>
                <Text maxW={180} isTruncated>
                  {item?.name}
                </Text>
                <Text>{item?.amount + '  ' + item.metrics}</Text>
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
        ml="auto"
        bg="black"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
      ></Pressable>
      <Pressable
        px={4}
        cursor="pointer"
        bg="black"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
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
      <Text italic fontSize="sm" ml={5} mt={3}>
        (swipe left to delete)
      </Text>
      {listData.length ? (
        <Box textAlign="center" flex={1} safeAreaTop>
          <SwipeListView
            disableRightSwipe
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-98}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        </Box>
      ) : (
        <Text mt={10} textAlign={'center'}>
          Your Shopping List is empty
        </Text>
      )}
    </View>
  );
};

export default ShoppingList;
