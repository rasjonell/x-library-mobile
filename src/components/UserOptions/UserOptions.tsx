import React from 'react';

import { Center, Modal, Button } from 'native-base';
import { useSignOut } from '../../api/auth';

interface UserOptionsProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UserOptions = ({ isOpen, onOpen, onClose }: UserOptionsProps) => {
  const signOut = useSignOut();

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header fontSize="4xl" fontWeight="bold">
            Available Actions
          </Modal.Header>
          <Modal.Footer>
            <Button variant="unstyled" mr="1" onPress={onClose}>
              Cancel
            </Button>
            <Button colorScheme="error" onPress={signOut}>
              Log Out
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Button onPress={onOpen}>Open Modal</Button>
    </Center>
  );
};

export default UserOptions;
