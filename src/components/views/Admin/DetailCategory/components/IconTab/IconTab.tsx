import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import useIconTab from "./IconTab.hook";
import { Controller } from "react-hook-form";
import { IconTabProps } from "./IconTab.types";

const IconTab = (props: IconTabProps) => {
  const { currentIcon, onUpdate, isPendingUpdate } = props;

  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    handleUploadIcon,
    handleSubmitUpdateIcon,
    controlUpdateIcon,
    errorsUpdateIcon,
    preview,
  } = useIconTab(props);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold">Category Icon</h1>
        <p className="w-full text-small text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="icon" fill className="relative" />
            </Skeleton>
          </div>
          <Controller
            control={controlUpdateIcon}
            name="icon"
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeleteIcon(onChange)}
                onUpload={(files) => handleUploadIcon(files, onChange)}
                isDropable
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateIcon.icon !== undefined}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Icon
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
                errorMessage={errorsUpdateIcon.icon?.message}
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
            type="submit"
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
