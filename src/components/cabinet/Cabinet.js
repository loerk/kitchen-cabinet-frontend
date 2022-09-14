import React, { useState, useEffect, useRef } from 'react';
import {
  HStack,
  Image,
  Center,
  View,
  ScrollView,
  Text,
  Spinner,
  AlertDialog,
  Button,
  VStack,
  Box,
} from 'native-base';

/* import { parseISO, formatDistanceToNow } from 'date-fns'; */

import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// environment variable
import { CABINET_ID } from '@env';

// custom components
import SearchBar from '../utils/SearchBar';
import DateTimePicker from '../utils/DateTimePicker';

import {
  useGetCabinetItemsQuery,
  useDeleteItemMutation,
  useEditItemMutation,
} from '../../features/api/apiSlice';

const Cabinet = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState(''); // based on search input
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState({ id: '', name: '' });
  const [toBeEdited, setToBeEdited] = useState({
    id: '',
    name: '',
    expiryDate: '',
  });
  const closeDeleteAlert = () => setIsOpenDeleteAlert(false);
  const closeEditForm = () => setIsOpenEditForm(false);

  const [selectedDate, setSelectedDate] = useState('');

  /*   if(isSuccess){
    cabinetItems.map(
      );
      
      const now = new Date()
      const expiryDate = new Date("2022-09-25T00:00:00.000Z")
      const milliNow = now.getTime()
      const milliEx = expiryDate.getTime()
    } */

  const {
    data: cabinetItems,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCabinetItemsQuery(CABINET_ID); // empty cabinet id: 6317109d801fa7692c1bb75a, filled cabinet id: 6315f1e0801fa7692c1bb736

  const [
    editCabinetItem,
    {
      isLoading: isLoadingEdit,
      isSuccess: isSuccessEdit,
      isError: isErrorEdit,
    },
  ] = useEditItemMutation();
  const [
    deleteCabinetItem,
    {
      isLoading: isLoadingDelete,
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
    },
  ] = useDeleteItemMutation();

  useEffect(() => {
    isSuccess &&
      setFilteredItems(
        cabinetItems.filter(({ name }) =>
          name.toLowerCase().startsWith(searchInput.toLowerCase())
        )
      );
  }, [searchInput]);

  const cancelRefDelete = useRef(null);
  const cancelRefEdit = useRef(null);

  const editItem = () => {
    /*  editCabinetItem({
       ...toBeEdited
     }).unwrap(); */

    console.log(selectedDate);
    console.log(toBeEdited);
    closeEditForm();
  };

  const deleteItem = () => {
    deleteCabinetItem({ id: toBeDeleted.id }).unwrap();
    closeDeleteAlert();
  };

  const EditForm = () => (
    <AlertDialog
      leastDestructiveRef={cancelRefEdit}
      isOpen={isOpenEditForm}
      onClose={closeEditForm}
      key={toBeEdited.id}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Edit Item</AlertDialog.Header>
        <AlertDialog.Body>
          Item Name: {toBeEdited.name}
          Expiry Date:{toBeEdited.expiryDate}
          <DateTimePicker
            onSelectedChange={(date) =>
              setToBeEdited((prevObj) => ({ ...prevObj, expiryDate: date }))
            }
          />
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={closeEditForm}
            >
              Cancel
            </Button>
            <Button onPress={editItem}>Save</Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );

  const ConfirmDelete = () => (
    <AlertDialog
      leastDestructiveRef={cancelRefDelete}
      isOpen={isOpenDeleteAlert}
      onClose={closeDeleteAlert}
      key={toBeDeleted.id}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Confirm Delete</AlertDialog.Header>
        <AlertDialog.Body>
          {`Are you sure you want to delete ${toBeDeleted.name} ?`}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={closeDeleteAlert}
              ref={cancelRefDelete}
            >
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={deleteItem}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <EditForm />
      <ConfirmDelete />

      <Center>
        <HStack alignItems="center">
          <SearchBar
            placeholder="Search an item"
            onChangeText={(newValue) => setSearchInput(newValue)}
            defaultValue={searchInput}
          />
        </HStack>

        <View>
          {isSuccess && cabinetItems.length === 0 && (
            <Text>Your cabinet is empty. Add an item.</Text>
          )}
          {filteredItems ? (
            filteredItems.map(({ _id: id, name, image }) => (
              <HStack space={3} alignItems="center" key={id}>
                <Image source={{ uri: `${image}` }} alt={name} size="sm" />
                <Text key={id}>{name}</Text>

                <FontAwesome5
                  name="edit"
                  size={14}
                  color="black"
                  onPress={() => {
                    setToBeEdited({ id, name });
                    setIsOpenEditForm(!isOpenEditForm);
                  }}
                />
                <AntDesign
                  name="delete"
                  size={16}
                  color="black"
                  onPress={() => {
                    setToBeDeleted({ id, name });
                    setIsOpenDeleteAlert(!isOpenDeleteAlert);
                  }}
                />
              </HStack>
            ))
          ) : isSuccess ? (
            cabinetItems.map(({ _id: id, name, image, expiryDate }) => (
              <VStack key={id}>
                <Box px="4">
                  <HStack>
                    <FontAwesome5
                      name="edit"
                      size={14}
                      color="black"
                      onPress={() => {
                        setToBeEdited({ id, name, expiryDate });
                        setIsOpenEditForm(!isOpenEditForm);
                      }}
                    />
                    <AntDesign
                      name="delete"
                      size={16}
                      color="black"
                      onPress={() => {
                        setToBeDeleted({ id, name });
                        setIsOpenDeleteAlert(!isOpenDeleteAlert);
                      }}
                    />
                  </HStack>
                </Box>
                <Box px="4" pt="4">
                  <HStack space="1">
                    <Image source={{ uri: `${image}` }} alt={name} size="sm" />
                    <Text
                      style={{ color: 'orange' }}
                      alignSelf="stretch"
                      isTruncated
                      maxW="200"
                      w="80%"
                      px="4"
                    >
                      {name}
                    </Text>
                  </HStack>
                </Box>
              </VStack>
            ))
          ) : isLoading ? (
            <Spinner text="Loading..." />
          ) : null}
        </View>
      </Center>
    </ScrollView>
  );
};

export default Cabinet;
