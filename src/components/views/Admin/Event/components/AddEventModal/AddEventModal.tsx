import React from "react";
import useAddEventModal from "./AddEventModal.hook";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { AddEventModalProps } from "./AddEventModal.types";
import { ICategory } from "@/types/Category";
import { IRegency } from "@/types/Event";

const AddEventModal = (props: AddEventModalProps) => {
  const { isOpen, onClose, onOpenChange } = props;

  const {
    preview,
    control,
    errors,
    handleSubmitForm,
    handleAddEvent,
    handleOnClose,
    isPendingMutateUploadFile,
    handleUploadBanner,
    isPendingMutateDeleteFile,
    handleDeleteBanner,
    isPendingMutateAddEvent,
    dataCategory,
    handleSearchRegion,
    dataRegion,
    searchRegency,
  } = useAddEventModal(props);

  const disabledSubmit =
    isPendingMutateAddEvent ||
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
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <div className="mb-4 flex flex-col gap-4">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Name"
                      variant="bordered"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="slug"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Slug"
                      variant="bordered"
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      label="Category"
                      variant="bordered"
                      isInvalid={errors.category !== undefined}
                      errorMessage={errors.category?.message}
                      onSelectionChange={(val) => onChange(val)}
                      placeholder="Search Category"
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={category._id}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Start Date"
                      hideTimeZone
                      showMonthAndYearPickers
                      variant="bordered"
                      isInvalid={errors.startDate !== undefined}
                      errorMessage={errors.startDate?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="End Date"
                      hideTimeZone
                      showMonthAndYearPickers
                      variant="bordered"
                      isInvalid={errors.endDate !== undefined}
                      errorMessage={errors.endDate?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="isPublished"
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status"
                      variant="bordered"
                      isInvalid={errors.isPublished !== undefined}
                      errorMessage={errors.isPublished?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Publish
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Draft
                      </SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="isFeatured"
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Featured"
                      variant="bordered"
                      isInvalid={errors.isFeatured !== undefined}
                      errorMessage={errors.isFeatured?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Yes
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        No
                      </SelectItem>
                    </Select>
                  )}
                />
                <p className="text-sm font-bold">Location</p>
                <div className="mb-4 flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="region"
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={
                          dataRegion?.data.data && searchRegency !== ""
                            ? dataRegion?.data.data
                            : []
                        }
                        label="City"
                        variant="bordered"
                        isInvalid={errors.region !== undefined}
                        errorMessage={errors.region?.message}
                        onInputChange={handleSearchRegion}
                        onSelectionChange={(val) => onChange(val)}
                        placeholder="Search City"
                      >
                        {(regency: IRegency) => (
                          <AutocompleteItem key={regency.id}>
                            {regency.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                  <Controller
                    control={control}
                    name="latitude"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Latitude"
                        variant="bordered"
                        isInvalid={errors.latitude !== undefined}
                        errorMessage={errors.latitude?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="longitude"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Longitude"
                        variant="bordered"
                        isInvalid={errors.longitude !== undefined}
                        errorMessage={errors.longitude?.message}
                      />
                    )}
                  />
                </div>
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
              </div>
              <p className="text-sm font-bold">Cover</p>
              <Controller
                control={control}
                name="banner"
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteBanner(onChange)}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    isDropable
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.banner !== undefined}
                    preview={typeof preview === "string" ? preview : ""}
                    errorMessage={errors.banner?.message}
                    className="mb-2"
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
              {isPendingMutateAddEvent || isPendingMutateUploadFile ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddEventModal;
