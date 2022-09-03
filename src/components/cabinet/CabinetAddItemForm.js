import { Button, Input, Spinner, View, Text } from "native-base";

import React, { useState } from "react";

import { useAddItemMutation } from "../../features/api/apiSlice";
import { IngredientsList } from "./IngredientsList";

export const AddItemForm = ({ cabinetId }) => {
  const [ingredient, setIngredient] = useState("");
  const [addIngredient, { data, isLoading, isSuccess, isError, error }] =
    useAddItemMutation(cabinetId);

  const canFetchIngredients = [ingredient].every(Boolean) && !isLoading;

  const saveItem = () => {
    if (canFetchIngredients) {
      addIngredient(ingredient).unwrap();
    }
  };
  let content;
  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    console.log(data);
  } else if (isError) {
    content = <Text>{error.toString()}</Text>;
  }
  return (
    <View>
      <Input
        placeholder={"item name"}
        inputValue={ingredient}
        onChangeText={(newText) => setIngredient(newText)}
      />
      {<IngredientsList ingredient={ingredient} />}
      <Button
        type="button"
        title="save item"
        onPress={saveItem}
        disabled={!canFetchIngredients}
      >
        Save Item
      </Button>
      {content}
    </View>
  );
};
