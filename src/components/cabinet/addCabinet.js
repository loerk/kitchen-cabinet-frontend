import { Button, Input, Spinner, View } from "native-base";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useAddCabinetMutation } from "../../features/api/apiSlice";

export const AddCabinetForm = () => {
  const [cabinetName, setCabinetName] = useState("");

  const [addCabinet, { isLoading }] = useAddCabinetMutation();

  const onCabinetNameChanged = (e) => setCabinetName(e.target.value);

  const canSave = [cabinetName].every(Boolean) && !isLoading;

  const onSaveCabinetPressed = async () => {
    if (canSave) {
      try {
        await addCabinet({ cabinetName }).unwrap();
        setCabinetName("");
      } catch (error) {
        console.error("Failed to save the cabinet: ", error);
      }
    }
  };

  const spinner = isLoading ? <Spinner size="30px" /> : null;

  return (
    <View>
      <Item floatingLabel>
        <Label>cabinet name</Label>
        <Input inputValue={cabinetName} onChange={onCabinetNameChanged} />
      </Item>

      <Button type="button" onClick={onSaveCabinetPressed} disabled={!canSave}>
        Save Cabinet
      </Button>
      {spinner}
    </View>
  );
};
