import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
  memo,
} from 'react';
import {
  HStack,
  Avatar,
  Icon,
  Center,
  useToast,
  useColorMode,
  Pressable,
  View,
  Text,
  Spinner,
  Button,
  Box,
  VStack,
  Heading,
} from 'native-base';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { SwipeListView } from 'react-native-swipe-list-view';

// custom components
import SearchBar from '../utils/SearchBar';
import EditItemDialog from './EditItemDialog';
import DeleteItemDialog from './DeleteItemDialog';

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
      setListData(
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

  listData &&
    listData
      .sort((a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate))
      .map(({ name, image, expiryDate }) => {
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

  const EditForm = () => (
    <EditItemDialog
      cancelRefEdit={cancelRefEdit}
      isOpenEditForm={isOpenEditForm}
      closeEditForm={closeEditForm}
      toBeEdited={toBeEdited}
      setShowCalendar={setShowCalendar}
      colorMode={colorMode}
      showCalendar={showCalendar}
      CURRENT_DATE={CURRENT_DATE}
      onDayPress={onDayPress}
      selected={selected}
      editCabinetItem={editCabinetItem}
      toast={toast}
      isErrorEdit={isErrorEdit}
    />
  );

  const ConfirmDelete = () => (
    <DeleteItemDialog
      cancelRefDelete={cancelRefDelete}
      isOpenDeleteAlert={isOpenDeleteAlert}
      closeDeleteAlert={closeDeleteAlert}
      toBeDeleted={toBeDeleted}
      setListData={setListData}
      listData={listData}
      setToDelete={setToDelete}
      toast={toast}
      isErrorDelete={isErrorDelete}
    />
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
          borderBottomColor="trueGray.200"
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
                  ? '#F7D9D3'
                  : aboutToExpire && colorMode === 'light'
                  ? 'orange.100'
                  : aboutToExpire && colorMode === 'dark'
                  ? '#FBF3D8'
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
    setToBeDeleted(() => ({ ...toBeDeleted, deletedItem }));
    setIsOpenDeleteAlert(!isOpenDeleteAlert);
  };

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1}>
      <Pressable
        px={5}
        cursor="pointer"
        bg="#891D47"
        justifyContent="center"
        onPressIn={() => {
          setToBeEdited({
            id: data.item._id,
            name:
              data.item.name.charAt(0).toUpperCase() + data.item.name.slice(1),
            expiryDate: data.item.expiryDate,
          });
          setIsOpenEditForm(!isOpenEditForm);
        }}
      >
        <Icon as={<AntDesign name="edit" size={'lg'} />} color="white" ml={5} />
      </Pressable>
      <Pressable
        px={4}
        mr="auto"
        bg="#891D47"
        justifyContent="center"
        onPress={() => {
          deleteRow(rowMap, data.item.key);
        }}
      ></Pressable>
      <Pressable
        px={4}
        ml="auto"
        bg="black"
        justifyContent="center"
        onPress={() => {
          deleteRow(rowMap, data.item.key);
        }}
      ></Pressable>
      <Pressable
        px={4}
        cursor="pointer"
        bg="black"
        justifyContent="center"
        onPressIn={() => {
          deleteRow(rowMap, data.item.key);
          setToBeDeleted({ id: data.item._id, name: data.item.name });
        }}
      >
        <Icon
          as={<AntDesign name="delete" size={'lg'} />}
          color="white"
          mr={7}
        />
      </Pressable>
    </HStack>
  );

  return (
    <View /* keyboardShouldPersistTaps="handled" */>
      <EditForm />
      <ConfirmDelete />
      <Heading mt={5}>Cabinet</Heading>
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
        <Box mt={4}>
          <Center>
            <SearchBar
              placeholder="Search an item"
              onChangeText={(newValue) => setSearchInput(newValue)}
              defaultValue={searchInput}
              /* onSubmitEditing={Keyboard.dismiss} */
            />
          </Center>
          <Box w={'90%'} h={'90%'} m={5}>
            <Box textAlign="center" flex={1} mb={128} safeAreaBottom>
              <SwipeListView
                removeClippedSubviews
                data={listData}
                renderItem={renderItem}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={98}
                rightOpenValue={-98}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            </Box>
          </Box>
        </Box>
      ) : isLoading ? (
        <Spinner text="Loading..." />
      ) : (
        <Center>
          <Text mt={5}>Your cabinet is empty.</Text>

          <Button
            onPressIn={() => navigation.navigate('Add')}
            w="50%"
            bg="secondary.100"
          >
            Add an Ingredient
          </Button>
        </Center>
      )}
    </View>
  );
};

export default memo(Cabinet);
