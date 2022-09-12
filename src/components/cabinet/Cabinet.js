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
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

// custom components
import SearchBar from '../SearchBar';

// helper function
import getCabinetItems from '../../helpers/getCabinetItems';
import {
  useDeleteItemMutation,
  useEditItemMutation,
} from '../../features/api/apiSlice';

const Cabinet = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState('');
  let cabinetItems = getCabinetItems('6315f1e0801fa7692c1bb736'); // empty cabinet id: 6317109d801fa7692c1bb75a, filled cabinet id: 6315f1e0801fa7692c1bb736
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState({ id: '', name: '' });
  const onClose = () => setIsOpenDeleteAlert(false);

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

  {
    /*   useEffect(() => {
    cabinetItems = getCabinetItems('6315f1e0801fa7692c1bb736');
  }, [isSuccessDelete]); */
  }

  useEffect(() => {
    cabinetItems.isSuccess &&
      setFilteredItems(
        cabinetItems.items.filter(({ name }) =>
          name.toLowerCase().startsWith(searchInput.toLowerCase())
        )
      );
  }, [searchInput]);

  const cancelRef = useRef(null);
  const editItem = () => {
    editCabinetItem({
      // item id and updated info
    }).unwrap();
  };

  const deleteItem = () => {
    deleteCabinetItem({ id: toBeDeleted.id }).unwrap();
    onClose();
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpenDeleteAlert}
        onClose={onClose}
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
                onPress={onClose}
                ref={cancelRef}
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
      <Center>
        <HStack alignItems="center">
          <SearchBar
            placeholder="Search an item"
            onChangeText={(newValue) => setSearchInput(newValue)}
            defaultValue={searchInput}
          />
        </HStack>

        <View>
          {cabinetItems.isSuccess && cabinetItems.items.length === 0 && (
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
                  onPress={editItem}
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
          ) : cabinetItems.isSuccess ? (
            cabinetItems.items.map(({ _id: id, name, image }) => (
              <HStack space={3} alignItems="center" key={id}>
                <Image source={{ uri: `${image}` }} alt={name} size="sm" />
                <Text key={id}>{name}</Text>
                <FontAwesome5
                  name="edit"
                  size={14}
                  color="black"
                  onPress={editItem}
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
          ) : cabinetItems.isLoading ? (
            <Spinner text="Loading..." />
          ) : null}
        </View>
      </Center>
    </ScrollView>
  );
};

export default Cabinet;
