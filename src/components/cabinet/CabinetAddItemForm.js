import { View, Text, Center, Button } from 'native-base';

import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAddItemMutation } from '../../features/api/apiSlice';
import { CabinetSelectItemAutocomplete } from './CabinetAddItemAutocomplete';

export const CabinetAddItemForm = () => {
  const [selectedIngredient, setSelectedIngredient] = useState({
    name: '',
    id: '',
    expiryDate: new Date(),
  });
  const [addItem, { isLoading, isSuccess, isError }] = useAddItemMutation();

  const cabinetId = '6315f1e0801fa7692c1bb736';
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
          {isLoading ? (
            <Button
              isLoading
              bg={'pink.400'}
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
              bg={'pink.400'}
              cursor="pointer"
              mb="33"
              mt="60"
              onPress={saveItem}
              disabled={!selectedIngredient.name}
            >
              Add Item
            </Button>
          )}
        </View>
      </View>
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
    </Center>
  );
};
