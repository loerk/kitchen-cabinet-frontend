import {
  Center,
  View,
  Text,
  Button,
  ScrollView,
  useColorMode,
  AlertDialog,
  Box,
  Heading,
  useToast,
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
import { addWeeks } from '../../helpers/getDefaultExpiryDate';

const date = new Date();
const INITIAL_DATE = `${date.getFullYear()}-${String(
  date.getMonth() + 1
).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const CabinetAddItemForm = () => {
  const toast = useToast();
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
  const [addItem, { isLoading, isError }] = useAddItemMutation();
  const [selected, setSelected] = useState(INITIAL_DATE);

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  const saveItem = () => {
    if (selectedIngredient.name) {
      addItem({
        cabinetId,
        id: selectedIngredient.id,
        expiryDate: selectedIngredient.expiryDate || addWeeks(2),
      }).unwrap();
    }
    setTimeout(() => {
      toast.show({
        duration: 1500,
        render: () => {
          return (
            <Box
              bg={isError ? 'error.300' : 'success.300'}
              px="2"
              py="1"
              shadow={3}
              rounded="sm"
              mb={12}
            >
              {!isError
                ? `You successfully added ${selectedIngredient.name} `
                : `We could not add ${selectedIngredient.name}`}
            </Box>
          );
        },
      });
    }, 2000);
  };

  return (
    <View>
      <Heading mt={5}>Add Ingredient</Heading>
      <ScrollView>
        <Center mt={'20%'}>
          <Text size="md" pt={4} bold>
            Please select an Ingredient
          </Text>
          <Text pb={4} fontSize="sm" italic>
            (Type 3+ letters)
          </Text>
          <CabinetSelectItemAutocomplete
            setSelectedIngredient={setSelectedIngredient}
            selectedIngredient={selectedIngredient}
          />
          <Box flex={1} alignItems={'center'}>
            <Text bold size="md" pb={5}>
              Pick an expiry Date
            </Text>
            <EvilIcons
              name="calendar"
              size={44}
              color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
              onPress={() => setIsOpenCalendar(!isOpenCalendar)}
            />

            {selectedIngredient.expiryDate ? (
              <Center>
                <Text>
                  {selectedIngredient.expiryDate.split('-').reverse().join('/')}
                </Text>
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
                mb="13"
                mt="30"
                onPress={saveItem}
                disabled={!selectedIngredient.name}
                bg="secondary.100"
              >
                Add Ingredient
              </Button>
            ) : (
              <Button
                cursor="pointer"
                mb="13"
                mt="30"
                onPress={saveItem}
                disabled={!selectedIngredient.name}
                bg="secondary.100"
              >
                Add Ingredient
              </Button>
            )}
          </Box>
        </Center>
      </ScrollView>
    </View>
  );
};
