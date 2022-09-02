import { Button, Input, Spinner, View, Text } from "native-base";

import React, { useState } from "react";

import { useAddCabinetMutation } from "../../features/api/apiSlice";

export const AddCabinetForm = () => {
  const [cabinetName, setCabinetName] = useState("");

  const [addCabinet, { isLoading, isSuccess, error }] = useAddCabinetMutation();

  const canSave = cabinetName && !isLoading;

  const saveCabinet = () => {
    if (canSave) {
      addCabinet(cabinetName).unwrap();
    }
  };
  const spinner = isLoading ? <Spinner /> : null;
  const success = isSuccess ? (
    <Text>Successfully created {cabinetName}</Text>
  ) : null;
  const errorMessage = error ? <Text>Sorry, something went wrong</Text> : null;
  return (
    <View>
      <Input
        placeholder={"cabinet name"}
        inputValue={cabinetName}
        onChangeText={(newText) => setCabinetName(newText)}
      />

      <Button
        type="button"
        title="save cabinet"
        onPress={saveCabinet}
        disabled={!canSave}
      >
        Save Cabinet
      </Button>
      {spinner}
      {success}
      {errorMessage}
    </View>
  );
};
