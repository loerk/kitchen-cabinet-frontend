import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import {
  HStack,
  Avatar,
  Icon,
  Center,
  useToast,
  useColorMode,
  ScrollView,
  Pressable,
  View,
  Text,
  Spinner,
  AlertDialog,
  Button,
  Box,
  VStack,
  Heading,
} from 'native-base';

import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
/* import { Keyboard } from 'react-native'; */
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { SwipeListView } from 'react-native-swipe-list-view';

// custom components
import SearchBar from '../utils/SearchBar';
import DatePicker from '../utils/DatePicker';

// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

import {
  useGetCabinetItemsQuery,
  useDeleteItemMutation,
  useEditItemMutation,
} from '../../features/api/apiSlice';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const date = new Date();
const CURRENT_DATE = `${date.getFullYear()}-${String(
  date.getMonth() + 1
).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const Cabinet = ({ navigation }) => {
  const { cabinetId } = useContext(AuthContext);
  const { colorMode } = useColorMode();
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
  const [listData, setListData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const closeDeleteAlert = () => setIsOpenDeleteAlert(false);
  const closeEditForm = () => setIsOpenEditForm(false);
  const [selected, setSelected] = useState(CURRENT_DATE);
  const [toDelete, setToDelete] = useState(false);

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
  } = useGetCabinetItemsQuery(cabinetId);

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
      error: deleteError,
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

  useEffect(() => {
    if (toDelete) deleteCabinetItem({ id: toBeDeleted.id }).unwrap();
    closeDeleteAlert();
    if (isSuccessDelete) setToDelete(false);
    if (isErrorDelete) console.log(deleteError);
  }, [toDelete]);

  useEffect(() => {
    if (cabinetItems) {
      const keyCabinetItems = cabinetItems.map((item, index) => ({
        ...item,
        key: index,
      }));
      setListData(keyCabinetItems);
    }
  }, [cabinetItems]);

  filteredItems &&
    filteredItems
      .sort((a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate))
      .map(({ _id: id, name, image, expiryDate }) => {
        const isExpired = +new Date(CURRENT_DATE) > +new Date(expiryDate);
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
                isExpired && colorMode === 'light'
                  ? 'red.100'
                  : isExpired && colorMode === 'dark'
                  ? 'red.200'
                  : aboutToExpire && colorMode === 'light'
                  ? 'orange.100'
                  : aboutToExpire && colorMode === 'dark'
                  ? 'orange.200'
                  : null
              }
              flex={1}
              justifyContent={'space-between'}
              space={3}
              p={2}
              alignItems="center"
              key={uuidv4()}
            >
              <Box flex={1} flexDir={'row'} alignItems={'center'}>
                <Avatar
                  source={{
                    uri: `https://spoonacular.com/cdn/ingredients_100x100/${image}`,
                  }}
                  alt={name}
                  size="lg"
                  ml={2}
                />
                <VStack>
                  <Text
                    bold
                    ml={6}
                    color={
                      isExpired
                        ? 'red.500'
                        : aboutToExpire
                        ? 'orange.400'
                        : null
                    }
                  >
                    {name
                      .split(' ')
                      .map(
                        (name) => name.charAt(0).toUpperCase() + name.slice(1)
                      )
                      .join(' ')}
                  </Text>
                  <Text
                    fontSize="sm"
                    pl={6}
                    color={
                      isExpired
                        ? 'red.500'
                        : aboutToExpire
                        ? 'orange.400'
                        : null
                    }
                  >
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
                      expiryDate.split('-').reverse().join('/')
                    )}
                  </Text>
                </VStack>
              </Box>
              <Box alignItems="center">
                {isExpired ? (
                  <HStack>
                    <MaterialIcons name="dangerous" size={20} color="red" />
                    <Text color="red.500" fontSize="sm" mr={2}>
                      Expired!
                    </Text>
                  </HStack>
                ) : aboutToExpire ? (
                  <HStack>
                    <AntDesign name="warning" size={16} color="darkorange" />
                    <Text color="orange.400" fontSize="sm" mr={2}>
                      Expiring!
                    </Text>
                  </HStack>
                ) : null}
              </Box>
            </HStack>
          </>
        );
      });

  const cancelRefDelete = useRef(null);
  const cancelRefEdit = useRef(null);

  /*   const deleteItem = () => {
       deleteCabinetItem({ id: toBeDeleted.id }).unwrap();
      closeDeleteAlert(); 
    }; */

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
              <Text>
                {toBeEdited.expiryDate.split('-').reverse().join('/')}{' '}
              </Text>
              <MaterialCommunityIcons
                name="calendar-edit"
                size={24}
                color={colorMode === 'dark' ? 'white' : 'black'}
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
              colorScheme="coolGray"
              onPress={closeEditForm}
            >
              Cancel
            </Button>
            <Button
              bg="secondary.100"
              onPress={() => {
                editCabinetItem(toBeEdited).unwrap();
                closeEditForm();
              }}
            >
              Save
            </Button>
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
            <Button colorScheme="danger" onPress={() => setToDelete(true)}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );

  const renderItem = ({ item }) => {
    const isExpired = +new Date(CURRENT_DATE) > +new Date(item.expiryDate);
    const remainingDaysLeft = Math.round(
      (+new Date(item.expiryDate) - +new Date(CURRENT_DATE)) /
        (1000 * 60 * 60 * 24)
    );
    const isTwoWeeksLeft = remainingDaysLeft <= 14;
    const aboutToExpire = remainingDaysLeft < 5;
    return (
      <Box>
        <Pressable
          bg={colorMode === 'dark' ? '#515050' : '#FCF5EA'}
          alignItems="center"
          borderBottomColor={colorMode === 'dark' ? 'muted.50' : 'muted.800'}
          borderBottomWidth={1}
          justifyContent="center"
          height={91}
          underlayColor={'#AAA'}
          py={10}
        >
          <HStack width="100%" h={90}>
            <HStack
              bg={
                isExpired && colorMode === 'light'
                  ? 'red.100'
                  : isExpired && colorMode === 'dark'
                  ? 'red.200'
                  : aboutToExpire && colorMode === 'light'
                  ? 'orange.100'
                  : aboutToExpire && colorMode === 'dark'
                  ? 'orange.200'
                  : null
              }
              flex={1}
              justifyContent={'space-between'}
              alignItems="center"
              key={uuidv4()}
            >
              <Box flex={1} flexDir={'row'} alignItems={'center'}>
                <Avatar
                  source={{
                    uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                  }}
                  alt={item.name}
                  size="lg"
                  ml={2}
                />
                <VStack>
                  <Text
                    bold
                    ml={6}
                    color={
                      isExpired
                        ? 'red.500'
                        : aboutToExpire
                        ? 'orange.400'
                        : null
                    }
                  >
                    {item.name
                      .split(' ')
                      .map(
                        (name) => name.charAt(0).toUpperCase() + name.slice(1)
                      )
                      .join(' ')}
                  </Text>
                  <Text
                    fontSize="sm"
                    pl={6}
                    color={
                      isExpired
                        ? 'red.500'
                        : aboutToExpire
                        ? 'orange.400'
                        : null
                    }
                  >
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
                      item.expiryDate.split('-').reverse().join('/')
                    )}
                  </Text>
                </VStack>
              </Box>
              <Box alignItems="center">
                {isExpired ? (
                  <HStack alignItems="center">
                    <MaterialIcons name="dangerous" size={20} color="red" />
                    <Text color="red.500" fontSize="sm" mr={2}>
                      Expired!
                    </Text>
                  </HStack>
                ) : aboutToExpire ? (
                  <HStack alignItems="center">
                    <AntDesign name="warning" size={16} color="darkorange" />
                    <Text color="orange.400" fontSize="sm" mr={2}>
                      {' '}
                      Expiring!
                    </Text>
                  </HStack>
                ) : null}
              </Box>
            </HStack>
          </HStack>
        </Pressable>
      </Box>
    );
  };

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
    setListData(newData.filter((item) => item !== deletedItem));

    setIsOpenDeleteAlert(!isOpenDeleteAlert);
    setListData(newData);
  };

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1} pl={2}>
      <Pressable
        px={5}
        ml="auto"
        bg="green.400"
        justifyContent="center"
        onPress={() => {
          setToBeEdited({
            id: data.item._id,
            name:
              data.item.name.charAt(0).toUpperCase() + data.item.name.slice(1),
            expiryDate: data.item.expiryDate,
          });
          setIsOpenEditForm(!isOpenEditForm);
        }}
      >
        <Icon
          as={<AntDesign name="edit" size={'lg'} />}
          color={colorMode === 'dark' ? 'white' : 'black'}
        />
      </Pressable>
      <Pressable
        px={4}
        cursor="pointer"
        bg="red.400"
        justifyContent="center"
        onPress={() => {
          setToBeDeleted({ id: data.item._id, name: data.item.name });
          deleteRow(rowMap, data.item.key);
        }}
      >
        <Icon
          as={<AntDesign name="delete" size={'lg'} />}
          color={colorMode === 'dark' ? 'white' : 'black'}
          mr="auto"
        />
      </Pressable>
    </HStack>
  );

  return (
    <View keyboardShouldPersistTaps="handled">
      <EditForm />
      <ConfirmDelete />
      <Heading mt={5}>Cabinet</Heading>
      <Text italic fontSize="sm" ml={5}>
        (swipe left to edit / delete)
      </Text>
      {cabinetItems ? (
        <Box ml={5} mt={4}>
          <SearchBar
            placeholder="Search an item"
            onChangeText={(newValue) => setSearchInput(newValue)}
            defaultValue={searchInput}
          />

          <VStack my={5}>
            {isSuccessEdit && (
              <Text color="green.500">
                {toBeEdited.name} was successfully updated.
              </Text>
            )}
            {isSuccessDelete && (
              <Text color="green.500">
                {toBeDeleted.name} was successfully deleted.
              </Text>
            )}
            {isErrorEdit && (
              <Text color="red.500">
                Something went wrong. {toBeEdited.name} could not be updated.
              </Text>
            )}
            {isErrorDelete && (
              <Text color="red.500">
                Something went wrong. {toBeDeleted.name} could not be deleted.
              </Text>
            )}
          </VStack>

          <Box w={'90%'} h={'90%'}>
            {isSuccess && cabinetItems.length === 0 && (
              <Text>Your cabinet is empty. Add an item.</Text>
            )}
            {filteredItems ? (
              <Box textAlign="center" flex={1} mb={128} safeAreaBottom>
                <SwipeListView
                  disableRightSwipe
                  data={filteredItems}
                  renderItem={renderItem}
                  initialNumToRender={5}
                  maxToRenderPerBatch={5}
                  renderHiddenItem={renderHiddenItem}
                  leftOpenValue={55}
                  rightOpenValue={-100}
                  previewRowKey={'0'}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                />
              </Box>
            ) : isLoading ? (
              <Spinner text="Loading..." />
            ) : null}
          </Box>
        </Box>
      ) : (
        <>
          <Center>
            <Text mt={5}>Your cabinet is empty.</Text>

            <Button
              onPress={() => navigation.navigate('Add')}
              w="50%"
              bg="secondary.100"
            >
              Add an item
            </Button>
          </Center>
        </>
      )}
    </View>
  );
};

export default Cabinet;
