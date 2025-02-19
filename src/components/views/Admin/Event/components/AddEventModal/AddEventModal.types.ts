export interface AddEventModalProps {
  refetchEvents: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isOpen: boolean;
}