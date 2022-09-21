import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  HStack,
  Image,
  Center,
  Pressable,
  View,
  ScrollView,
  Text,
  Spinner,
  AlertDialog,
  Button,
  Box,
} from 'native-base';
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

// environment variable
import { CABINET_ID } from '@env';

// custom components
import SearchBar from '../utils/SearchBar';
import DatePicker from '../utils/DatePicker';

import {
  useGetCabinetItemsQuery,
  useDeleteItemMutation,
  useEditItemMutation,
} from '../../features/api/apiSlice';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const date = new Date();
const INITIAL_DATE = `${date.getFullYear()}-${String(
  date.getMonth() + 1
).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

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
  const [showCalendar, setShowCalendar] = useState(false);
  const closeDeleteAlert = () => setIsOpenDeleteAlert(false);
  const closeEditForm = () => setIsOpenEditForm(false);
  const [selected, setSelected] = useState(INITIAL_DATE);

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
    setToBeEdited((prevObj) => ({ ...prevObj, expiryDate: day.dateString }));
    setShowCalendar(false);
  }, []);

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
    editCabinetItem(toBeEdited).unwrap();

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
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Edit</AlertDialog.Header>
        <AlertDialog.Body>
          <Text bold>Item Name:</Text>
          <Text>{toBeEdited.name}</Text>
          <Text bold mt={5}>
            Expiry Date:
          </Text>
          <Pressable onPress={() => setShowCalendar(true)}>
            <HStack>
              <Text>{toBeEdited.expiryDate} </Text>
              <MaterialCommunityIcons
                name="calendar-edit"
                size={24}
                color="black"
              />
            </HStack>
          </Pressable>
          {showCalendar && (
            <DatePicker
              INITIAL_DATE={INITIAL_DATE}
              onDayPress={onDayPress}
              selected={selected}
            />
          )}
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
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Confirm Delete</AlertDialog.Header>
        <AlertDialog.Body>
          <Text>{`Are you sure you want to delete ${toBeDeleted.name} ?`}</Text>
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View keyboardShouldPersistTaps="handled">
        <EditForm />
        <ConfirmDelete />

        <Center>
          <HStack alignItems="center" mb={5}>
            <SearchBar
              placeholder="Search an item"
              onChangeText={(newValue) => setSearchInput(newValue)}
              defaultValue={searchInput}
            />
          </HStack>
          <ScrollView w={'80%'} pr={4}>
            <Box>
              {isSuccess && cabinetItems.length === 0 && (
                <Text>Your cabinet is empty. Add an item.</Text>
              )}
              {filteredItems ? (
                filteredItems
                  .sort(
                    (a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate)
                  )
                  .map(({ _id: id, name, image, expiryDate }) => (
                    <HStack
                      flex={1}
                      justifyContent={'space-between'}
                      space={3}
                      mb={4}
                      alignItems="center"
                      key={uuidv4()}
                    >
                      <Box flex={1} flexDir={'row'} alignItems={'center'}>
                        <Image
                          source={{
                            uri: `https://spoonacular.com/cdn/ingredients_100x100/${image}`,
                          }}
                          // borderRadius={'100'}
                          alt={name}
                          size="sm"
                        />
                        <Text ml={6}>
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Text>
                      </Box>
                      <Box>
                        <HStack space={4}>
                          <FontAwesome5
                            name="edit"
                            size={20}
                            color="black"
                            onPress={() => {
                              setToBeEdited({
                                id,
                                name:
                                  name.charAt(0).toUpperCase() + name.slice(1),
                                expiryDate,
                              });
                              setIsOpenEditForm(!isOpenEditForm);
                            }}
                          />
                          <AntDesign
                            name="delete"
                            size={23}
                            color="black"
                            onPress={() => {
                              setToBeDeleted({ id, name });
                              setIsOpenDeleteAlert(!isOpenDeleteAlert);
                            }}
                          />
                        </HStack>
                      </Box>
                    </HStack>
                  ))
              ) : isLoading ? (
                <Spinner text="Loading..." />
              ) : null}
            </Box>
          </ScrollView>
        </Center>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Cabinet;
