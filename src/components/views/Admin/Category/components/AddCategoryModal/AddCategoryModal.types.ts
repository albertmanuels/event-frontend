import { UseDisclosureProps } from "@nextui-org/react";

export interface AddCategoryModalProps {
  refetchCategory: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isOpen: boolean;
}