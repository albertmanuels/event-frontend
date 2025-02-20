import { Dispatch, SetStateAction } from "react";

export interface DeleteEventModalProps {
  refetchEvents: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isOpen: boolean;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}