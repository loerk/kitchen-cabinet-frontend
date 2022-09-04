import { Button, Input, Spinner, View, Text } from "native-base";

import React, { useState } from "react";

import { useAddItemMutation } from "../../features/api/apiSlice";
import { IngredientsList } from "./IngredientsList";

export const CabinetAddItemForm = ({ cabinetId }) => {
  const [selected, setSelected] = useState({ name: "", id: "" });
  const [ingredient, setIngredient] = useState("");
  const [addIngredient, { data, isLoading, isSuccess, isError, error }] =
    useAddItemMutation(cabinetId);

  const canSaveItem = selected.name && !isLoading;

  const saveItem = () => {
    if (canSaveItem) {
      console.log("can save", selected);
      // addIngredient(ingredient).unwrap();
    }
  };
  console.log("base", selected);
  if (isLoading) return <Spinner text="Loading..." />;
  if (isError) return <Text>{error.toString()}</Text>;
  if (true)
    return (
      <View>
        <Input
          placeholder={"item name"}
          defaultValue={selected.name}
          onChangeText={(newText) => setIngredient(newText)}
        />
        {
          <IngredientsList
            ingredient={ingredient}
            selected={selected}
            setSelected={setSelected}
          />
        }
        <Button
          type="button"
          title="save item"
          onPress={saveItem}
          disabled={!canSaveItem}
        >
          Save Item
        </Button>
      </View>
    );
};
