import React, { useEffect } from "react";
import useAddCategoryModal from "./AddCategoryModal.hook";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { AddCategoryModalProps } from "./AddCategoryModal.types";

const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { isOpen, onClose, onOpenChange } = props;

  const {
    preview,
    control,
    errors,
    handleSubmitForm,
    handleAddCategory,
    handleOnClose,
    isPendingMutateAddCategory,
    isPendingMutateUploadFile,
    handleUploadIcon,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
  } = useAddCategoryModal(props);

  const disabledSubmit =
    isPendingMutateAddCategory ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      scrollBehavior="inside"
      placement="center"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
              <p className="text-sm font-bold">Icon</p>
              <Controller
                control={control}
                name="icon"
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteIcon(onChange)}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isDropable
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.icon !== undefined}
                    preview={typeof preview === "string" ? preview : ""}
                    errorMessage={errors.icon?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="danger" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddCategory || isPendingMutateUploadFile ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
