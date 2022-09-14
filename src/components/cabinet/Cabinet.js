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
  Modal,
  FormControl,
  Button,
  Input,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

// custom components
import SearchBar from '../SearchBar';

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
    name: '' /* expiryDate: new Date() */,
  });
  const closeDeleteAlert = () => setIsOpenDeleteAlert(false);
  const closeEditForm = () => setIsOpenEditForm(false);

  const {
    data: cabinetItems,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCabinetItemsQuery('6315f1e0801fa7692c1bb736'); // empty cabinet id: 6317109d801fa7692c1bb75a, filled cabinet id: 6315f1e0801fa7692c1bb736

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
    closeEditForm();
    console.log(toBeEdited);
  };

  const deleteItem = () => {
    deleteCabinetItem({ id: toBeDeleted.id }).unwrap();
    closeDeleteAlert();
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <AlertDialog
        leastDestructiveRef={cancelRefDelete}
        isOpen={isOpenDeleteAlert}
        onClose={closeDeleteAlert}
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

      <Modal isOpen={isOpenEditForm} onClose={closeEditForm}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edit Item</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Item Name</FormControl.Label>
              {/* <Input placeholder={toBeEdited.name} value={toBeEdited.name} onChangeText={(newValue) => setToBeEdited({ ...toBeEdited, name: newValue })} /> */}
              {toBeEdited.name}
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Expiry Date</FormControl.Label>
              {/*  <DateTimePicker
                style={{
                  width: 80,
                }}
                value={toBeEdited.expiryDate}
                onChange={(_, selectedDate) => setToBeEdited({ ...toBeEdited, expiryDate: selectedDate })}
              /> */}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
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
          </Modal.Footer>
        </Modal.Content>
      </Modal>

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
                <Feather
                  name="x"
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
              <HStack space={3} alignItems="center" key={id}>
                <Image source={{ uri: `${image}` }} alt={name} size="sm" />
                <Text key={id}>{name}</Text>
                <FontAwesome5
                  name="edit"
                  size={14}
                  color="black"
                  onPress={() => {
                    setToBeEdited({ id, name, expiryDate });
                    setIsOpenEditForm(!isOpenEditForm);
                  }}
                />
                <Feather
                  name="x"
                  size={16}
                  color="black"
                  onPress={() => {
                    setToBeDeleted({ id, name });
                    setIsOpenDeleteAlert(!isOpenDeleteAlert);
                  }}
                />
              </HStack>
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
