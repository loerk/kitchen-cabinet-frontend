import {
  HStack,
  Center,
  View,
  Text,
  Button,
  ScrollView,
  useColorMode,
  AlertDialog,
} from 'native-base';

import { EvilIcons } from '@expo/vector-icons';
import React, { useState, useCallback, useRef, useContext } from 'react';
import { useAddItemMutation } from '../../features/api/apiSlice';

// custom components
/* import DateTimePicker from '../utils/DateTimePicker';*/
import { CabinetSelectItemAutocomplete } from './CabinetAddItemAutocomplete';
import DatePicker from '../utils/DatePicker';

// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

const date = new Date();
const INITIAL_DATE = `${date.getFullYear()}-${String(
  date.getMonth() + 1
).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const CabinetAddItemForm = () => {
  const { cabinetId } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const closeCalendar = () => setIsOpenCalendar(false);
  const cancelRef = useRef(null);
  const [selectedIngredient, setSelectedIngredient] = useState({
    name: '',
    id: '',
    expiryDate: '',
  });
  const [addItem, { isLoading, isSuccess, isError }] = useAddItemMutation();

  const [selected, setSelected] = useState(INITIAL_DATE);

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  selectedIngredient && console.log(selectedIngredient);
  const saveItem = () => {
    if (selectedIngredient.name) {
      addItem({
        cabinetId,
        id: selectedIngredient.id,
        expiryDate: selectedIngredient.expiryDate,
      }).unwrap();
    }
  };

  return (
    <>
      <ScrollView>
        <Center>
          <Text size="md" py={4} bold>
            Please select an Item
          </Text>
        </Center>
        <CabinetSelectItemAutocomplete
          setSelectedIngredient={setSelectedIngredient}
          selectedIngredient={selectedIngredient}
        />
        <View>
          <HStack justifyContent="center" alignItems="flex-end">
            <Text bold size="md" pb={2}>
              Pick an expiry Date
            </Text>
            <EvilIcons
              name="calendar"
              size={44}
              color="black"
              onPress={() => setIsOpenCalendar(!isOpenCalendar)}
            />
          </HStack>
          {selectedIngredient.expiryDate ? (
            <Center>
              <Text>{selectedIngredient.expiryDate}</Text>
            </Center>
          ) : null}
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpenCalendar}
            onClose={closeCalendar}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header></AlertDialog.Header>
              <AlertDialog.Body>
                <DatePicker
                  INITIAL_DATE={INITIAL_DATE}
                  onDayPress={onDayPress}
                  selected={selected}
                />
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  onPress={() => {
                    setSelectedIngredient((prevObj) => ({
                      ...prevObj,
                      expiryDate: selected,
                    }));
                    closeCalendar();
                  }}
                >
                  Set Date
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>

          {isLoading ? (
            <Button
              isLoading
              cursor="pointer"
              mb="33"
              mt="60"
              onPress={saveItem}
              disabled={!selectedIngredient.name}
            >
              Add Item
            </Button>
          ) : (
            <Button
              cursor="pointer"
              mb="33"
              mt="60"
              onPress={saveItem}
              disabled={!selectedIngredient.name}
              bg={colorMode === 'light' ? 'secondary.100' : 'primary.100'}
            >
              Add Item
            </Button>
          )}
        </View>
      </ScrollView>
      {isSuccess ? (
        <Text>
          You successfully added {selectedIngredient.name} to your cabinet!
        </Text>
      ) : null}
      {isError ? (
        <Text>
          Oops please check you cabinet, we are not sure if this worked
        </Text>
      ) : null}
    </>
  );
};
