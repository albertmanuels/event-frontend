import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { InfoTabProps } from "./InfoTab.types";
import useInfoTab from "./InfoTab.hook";
import { Controller } from "react-hook-form";

const InfoTab = (props: InfoTabProps) => {
  const { dataCategory, onUpdate, isPendingUpdate } = props;

  const { controlUpdateInfo, errorsUpdateInfo, handleSubmitUpdateInfo } =
    useInfoTab(props);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold">Category Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Name"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataCategory?.description}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateInfo}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataCategory?._id}
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

export default InfoTab;
