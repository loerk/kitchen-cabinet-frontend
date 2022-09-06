import { Button, Spinner, View, Text, Center } from 'native-base';

import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAddItemMutation } from '../../features/api/apiSlice';
import { CabinetSelectItemAutocomplete } from './CabinetAddItemAutocomplete';

export const CabinetAddItemForm = ({ cabinetId }) => {
  const [selectedIngredient, setSelectedIngredient] = useState({
    name: '',
    id: '',
    expiryDate: new Date(),
  });
  const [addItem, { data, isLoading, isError, isSuccess, error }] =
    useAddItemMutation();

  const onChangeDate = (_, selectedDate) => {
    const currentDate = selectedDate || selectedIngredient.expiryDate;

    setSelectedIngredient({
      ...selectedIngredient,
      expiryDate: currentDate,
    });
  };

  const canSaveItem = selectedIngredient.name && !isLoading;

  const saveItem = () => {
    if (canSaveItem) {
      addItem({
        cabinetId,
        id: selectedIngredient.id,
        expiryDate: selectedIngredient.expiryDate,
      }).unwrap();
    }
  };
  return (
    <View>
      <Center>
        <Text>Add an item to your Cabinet:</Text>
        <View>
          <CabinetSelectItemAutocomplete
            setSelectedIngredient={setSelectedIngredient}
            selectedIngredient={selectedIngredient}
          />
          <View w={150}>
            <DateTimePicker
              value={selectedIngredient.expiryDate}
              display="default"
              onChange={onChangeDate}
            />
          </View>
          <Button
            w={200}
            type="button"
            title="save item"
            onPress={saveItem}
            disabled={!canSaveItem}
          >
            Save Item
          </Button>
        </View>
        {isSuccess ? (
          <Text>
            You successfully added {selectedIngredient.name} to your cabinet!
          </Text>
        ) : null}
        {isLoading ? <Spinner text="Loading..." /> : null}{' '}
        {isError ? <Text>{error.toString()}</Text> : null}
      </Center>
    </View>
  );
};
