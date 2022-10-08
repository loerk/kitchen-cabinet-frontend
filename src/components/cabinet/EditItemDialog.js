import { Text, Pressable, HStack, Box } from 'native-base';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AlertDialogMsg from '../utils/AlertDialogMsg';
import DatePicker from '../utils/DatePicker';

const EditItemDialog = ({
  cancelRefEdit,
  isOpenEditForm,
  closeEditForm,
  toBeEdited,
  setShowCalendar,
  colorMode,
  showCalendar,
  CURRENT_DATE,
  onDayPress,
  selected,
  editCabinetItem,
  toast,
  isErrorEdit,
}) => {
  return (
    <AlertDialogMsg
      cancelRef={cancelRefEdit}
      isOpen={isOpenEditForm}
      onClose={closeEditForm}
      header="Edit"
      body={
        <>
          <Text bold>Item Name:</Text>
          <Text>{toBeEdited.name}</Text>
          <Text bold mt={5}>
            Expiry Date:
          </Text>
          <Pressable onPressIn={() => setShowCalendar(true)}>
            <HStack>
              <Text>
                {toBeEdited.expiryDate.split('-').reverse().join('/')}{' '}
              </Text>
              <MaterialCommunityIcons
                name="calendar-edit"
                size={24}
                color={colorMode === 'dark' ? 'white' : 'black'}
              />
            </HStack>
          </Pressable>
          {showCalendar && (
            <DatePicker
              INITIAL_DATE={CURRENT_DATE}
              onDayPress={onDayPress}
              selected={selected}
              expiryDate={toBeEdited.expiryDate}
            />
          )}
        </>
      }
      onPressCancel={closeEditForm}
      onPressContinue={() => {
        editCabinetItem(toBeEdited).unwrap();
        closeEditForm();
        toast.show({
          render: () => {
            return (
              <Box
                bg={isErrorEdit ? 'error.300' : 'success.300'}
                px="2"
                py="1"
                shadow={3}
                rounded="sm"
                mb={8}
              >
                {isErrorEdit
                  ? 'We could not update this ingredient'
                  : 'The ingredient was successfully updated'}
              </Box>
            );
          },
        });
      }}
      continueBtnText="Save"
    />
  );
};

export default EditItemDialog;