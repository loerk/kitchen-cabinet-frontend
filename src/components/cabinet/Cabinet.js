import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  HStack,
  Image,
  Center,
  useToast,
  Pressable,
  Divider,
  View,
  ScrollView,
  Text,
  Spinner,
  AlertDialog,
  Button,
  Box,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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

const date = new Date();
const CURRENT_DATE = `${date.getFullYear()}-${String(
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
  const [selected, setSelected] = useState(CURRENT_DATE);

  const toast = useToast();

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
      error: editError,
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
    editCabinetItem(toBeEdited)
      .unwrap()
      .then((payload) => {
        console.log(payload);
        closeEditForm();
      })
      .catch((error) => console.log(error));
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
              INITIAL_DATE={CURRENT_DATE}
              onDayPress={onDayPress}
              selected={selected}
              expiryDate={toBeEdited.expiryDate}
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
            <Button onPress={() => editItem}>Save</Button>
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
    <ScrollView bg={'white'}>
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

        <View w={'75%'}>
          {isSuccess && cabinetItems.length === 0 && (
            <Text>Your cabinet is empty. Add an item.</Text>
          )}
          {filteredItems ? (
            filteredItems
              .sort((a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate))
              .map(({ _id: id, name, image, expiryDate }) => {
                const isExpired =
                  +new Date(CURRENT_DATE) > +new Date(expiryDate);
                const remainingDaysLeft = Math.round(
                  (+new Date(expiryDate) - +new Date(CURRENT_DATE)) /
                    (1000 * 60 * 60 * 24)
                );
                const isTwoWeeksLeft = remainingDaysLeft <= 14;
                const aboutToExpire = remainingDaysLeft < 5;
                return (
                  <>
                    <HStack
                      bg={
                        isExpired
                          ? 'red.100'
                          : aboutToExpire
                          ? 'orange.100'
                          : null
                      }
                      flex={1}
                      justifyContent={'space-between'}
                      space={3}
                      p={2}
                      alignItems="center"
                      key={id}
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
                        <View ml={6}>
                          <Text bold>
                            {name
                              .split(' ')
                              .map(
                                (name) =>
                                  name.charAt(0).toUpperCase() + name.slice(1)
                              )
                              .join(' ')}
                          </Text>
                          <Text fontSize="sm">
                            {'Expiry Date: \n'}
                            {isTwoWeeksLeft ? (
                              remainingDaysLeft >= 0 ? (
                                `${remainingDaysLeft} day${
                                  remainingDaysLeft !== 1 ? 's' : ''
                                } left`
                              ) : (
                                <Text style={{ color: 'red' }}>
                                  {Math.abs(remainingDaysLeft)} day
                                  {remainingDaysLeft !== -1 ? 's' : ''} ago
                                </Text>
                              )
                            ) : (
                              expiryDate.split('-').reverse().join('-')
                            )}
                          </Text>
                        </View>
                      </Box>
                      <Box alignItems="center">
                        <HStack space={4} alignItems="center" mt={5}>
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
                        {isExpired ? (
                          <HStack mt={1}>
                            <MaterialIcons
                              name="dangerous"
                              size={20}
                              color="red"
                            />
                            <Text color="red.500" fontSize="sm">
                              Expired!
                            </Text>
                          </HStack>
                        ) : aboutToExpire ? (
                          <HStack mt={1}>
                            <AntDesign
                              name="warning"
                              size={20}
                              color="darkorange"
                            />
                            <Text color="orange.400" fontSize="sm">
                              {' '}
                              Expiring!
                            </Text>
                          </HStack>
                        ) : null}
                      </Box>
                    </HStack>
                    <Divider
                      _light={{
                        bg: 'muted.800',
                      }}
                      _dark={{
                        bg: 'muted.50',
                      }}
                    />
                  </>
                );
              })
          ) : isLoading ? (
            <Spinner text="Loading..." />
          ) : null}
        </View>
        {/*  {isSuccessEdit && onOpenSuccessMsg()}
        <Alert w='100%' variant='solid' colorScheme='success' status='success' isOpen={isSuccessMsgOpen} onClose={onSuccessMsgClose}>
          <VStack space={2} flexShrink={1} w='100%'>
            <HStack flexShrink={1} space={2} alignItems='center' justifyContent='space-between'>
              <HStack space={2} flexShrink={1} alignItems='center'>
                <Alert.Icon />
                <Text color='warmGray.50'>
                  {toBeEdited.name} was successfully updated!
                </Text>
              </HStack>
              <IconButton onPress={onSuccessMsgClose} variant='unstyled' _focus={{
                borderWidth: 0
              }} icon={<CloseIcon size='3' />} _icon={{
                color: 'warmGray.50'
              }} />
            </HStack>
          </VStack>
        </Alert> */}
      </Center>
    </ScrollView>
  );
};

export default Cabinet;
