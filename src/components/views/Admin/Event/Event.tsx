import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import useEvent from "./Event.hook";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./components/AddEventModal";

const Event = () => {
  const router = useRouter();

  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    setSelectedId,
    refetchEvents,
  } = useEvent();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-video w-36 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                router.push(`/admin/event/${event._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
              }}
            />
          );
        case "isPublish":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {event.isPublish ? "Published" : "Not Published"}
            </Chip>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [router.push],
  );

  return (
    <section>
      {Object.keys(router.query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Event"
          columns={COLUMN_LIST_EVENT}
          data={dataEvents?.data || []}
          totalPages={dataEvents?.pagination?.totalPages}
          isLoading={isLoadingEvents || isRefetchingEvents}
          renderCell={renderCell}
          onClickButtonTopContent={addEventModal.onOpen}
          emptyContent="Event is empty"
        />
      )}
      <AddEventModal {...addEventModal} refetchEvents={refetchEvents} />
    </section>
  );
};

export default Event;
