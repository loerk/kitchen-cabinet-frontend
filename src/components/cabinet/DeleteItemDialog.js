import { Text } from 'native-base';
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
      }}
      continueBtnText="Delete"
    />
  );
};

export default DeleteItemDialog;
