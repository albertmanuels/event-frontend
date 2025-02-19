import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";

interface DropdownActionProps {
  onPressButtonDelete: () => void;
  onPressButtonDetail: () => void;
}

const DropdownAction = (props: DropdownActionProps) => {
  const { onPressButtonDetail, onPressButtonDelete } = props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="detail-category-button"
          onPress={onPressButtonDetail}
        >
          Detail
        </DropdownItem>
        <DropdownItem
          key="delete-category-button"
          className="text-danger-500"
          onPress={onPressButtonDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
