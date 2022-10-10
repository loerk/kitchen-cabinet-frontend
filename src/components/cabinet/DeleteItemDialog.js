import { Text, Box } from 'native-base';
import React from 'react';

import AlertDialogMsg from '../utils/AlertDialogMsg';

const DeleteItemDialog = ({
  cancelRefDelete,
  isOpenDeleteAlert,
  closeDeleteAlert,
  toBeDeleted,
  setListData,
  listData,
  setToDelete,
  toast,
  isErrorDelete,
}) => {
  return (
    <AlertDialogMsg
      cancelRef={cancelRefDelete}
      isOpen={isOpenDeleteAlert}
      onClose={closeDeleteAlert}
      header="Confirm Delete"
      body={
        <>
          <Text>{`Are you sure you want to delete ${toBeDeleted.name} ?`}</Text>
        </>
      }
      onPressCancel={closeDeleteAlert}
      onPressContinue={() => {
        setListData(listData.filter((item) => item !== toBeDeleted.deletedIem));
        setToDelete(true);
        closeDeleteAlert();
        toast.show({
          duration: 1500,
          render: () => {
            return (
              <Box
                bg={isErrorDelete ? 'error.300' : 'success.300'}
                px="2"
                py="1"
                shadow={3}
                rounded="sm"
                mb={12}
              >
                {isErrorDelete
                  ? `We could not delete ${toBeDeleted.name}`
                  : `${toBeDeleted.name
                      .split(' ')
                      .map(
                        (name) => name.charAt(0).toUpperCase() + name.slice(1)
                      )
                      .join(' ')} was successfully deleted`}
              </Box>
            );
          },
        });
      }}
      continueBtnText="Delete"
    />
  );
};

export default DeleteItemDialog;
