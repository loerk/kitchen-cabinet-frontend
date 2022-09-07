import { Spinner, View, Text, Center, Button } from 'native-base';

import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { useAddItemMutation } from '../../features/api/apiSlice';
import { CabinetSelectItemAutocomplete } from './CabinetAddItemAutocomplete';

export const CabinetAddItemForm = ({ cabinetId }) => {
  const [selectedIngredient, setSelectedIngredient] = useState({
    name: '',
    id: '',
    expiryDate: new Date(),
  });
  const [addItem, { data, isLoading, isSuccess, isError, error }] =
    useAddItemMutation();

  const onChangeDate = (_, selectedDate) => {
    const currentDate = selectedDate || selectedIngredient.expiryDate;

    setSelectedIngredient({
      ...selectedIngredient,
      expiryDate: currentDate,
    });
  };

  const saveItem = () => {
    if (selectedIngredient.name) {
      addItem({
        cabinetId,
        id: selectedIngredient.id,
        expiryDate: selectedIngredient.expiryDate,
      }).unwrap();
    }
  };

  console.log({ selectedIngredient });
  console.log(data);
  console.log(error);
  return (
    <Center>
      <View>
        <Text size="md" py={4} bold>
          Please select an Item
        </Text>
        <CabinetSelectItemAutocomplete
          setSelectedIngredient={setSelectedIngredient}
          selectedIngredient={selectedIngredient}
        />
        <View>
          <Text bold size="md" pb={2}>
            Pick an expiry Date
          </Text>
          <DateTimePicker
            style={{
              width: 80,
            }}
            value={selectedIngredient.expiryDate}
            onChange={onChangeDate}
          />
          <Button
            bg={'pink.400'}
            cursor="pointer"
            mb="33"
            mt="60"
            onPress={saveItem}
            disabled={!selectedIngredient.name}
          >
            <AntDesign size={26} color="black" name="pluscircleo" />
          </Button>
        </View>
      </View>
      {isSuccess ? (
        <Text>
          You successfully added {selectedIngredient.name} to your cabinet!
        </Text>
      ) : null}
      {isLoading ? <Spinner text="Loading..." /> : null}{' '}
      {isError ? (
        <Text>
          Oops please check you cabinet, we are not sure if this worked
        </Text>
      ) : null}
    </Center>
  );
};
