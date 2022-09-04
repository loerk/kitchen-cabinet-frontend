import { Button, Input, Spinner, View, Text, Center } from "native-base";

import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAddItemMutation } from "../../features/api/apiSlice";
import { IngredientsList } from "./IngredientsList";

export const CabinetAddItemForm = ({ cabinetId }) => {
  const [selectedIngredient, setSelectedIngredient] = useState({
    name: "",
    id: "",
    expiryDate: new Date(),
  });
  const [ingredientQuery, setIngredientQuery] = useState("");

  const onChangeDate = (_, selectedDate) => {
    const currentDate = selectedDate || selectedIngredient.expiryDate;

    setSelectedIngredient({
      ...selectedIngredient,
      expiryDate: currentDate,
    });
  };

  const [addIngredient, { data, isLoading, isError, error }] =
    useAddItemMutation(cabinetId);

  const canSaveItem = selectedIngredient.name && !isLoading;

  const saveItem = () => {
    if (canSaveItem) {
      addIngredient(selectedIngredient).unwrap();
    }
  };

  if (isLoading) return <Spinner text="Loading..." />;
  if (isError) return <Text>{error.toString()}</Text>;

  return (
    <View>
      <Center>
        <Text>Add an item to your Cabinet:</Text>
        <View>
          <Input
            w={200}
            placeholder={"item name"}
            defaultValue={selectedIngredient.name}
            onChangeText={(text) => setIngredientQuery(text)}
          />
          {
            <IngredientsList
              ingredientQuery={ingredientQuery}
              setIngredientQuery={setIngredientQuery}
              selectedIngredient={selectedIngredient}
              setSelectedIngredient={setSelectedIngredient}
            />
          }

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
      </Center>
    </View>
  );
};
