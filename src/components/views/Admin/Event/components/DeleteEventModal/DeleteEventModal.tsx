import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import React from "react";
import useDeleteEventModal from "./DeleteEventModal.hook";
import { DeleteEventModalProps } from "./DeleteEventModal.types";

const DeleteEventModal = (props: DeleteEventModalProps) => {
  const { isOpen, onClose, onOpenChange, selectedId, setSelectedId } = props;

  const { mutateDeleteEvent, isPendingMutateDeleteEvent } =
    useDeleteEventModal(props);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      scrollBehavior="inside"
      placement="center"
      onClose={onClose}
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Event</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this event?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteEvent}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteEvent}
            onPress={() => mutateDeleteEvent(selectedId)}
          >
            {isPendingMutateDeleteEvent ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
