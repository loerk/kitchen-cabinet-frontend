import { AlertDialog, Button } from 'native-base';
import React from 'react';

const AlertDialogMsg = ({
  cancelRef,
  isOpen,
  onClose,
  header,
  body,
  onPressCancel,
  onPressContinue,
  continueBtnText,
}) => {
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{header}</AlertDialog.Header>
        <AlertDialog.Body>{body}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="coolGray"
              onPress={onPressCancel}
            >
              Cancel
            </Button>
            <Button bg="secondary.100" onPress={onPressContinue}>
              {continueBtnText}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default AlertDialogMsg;
