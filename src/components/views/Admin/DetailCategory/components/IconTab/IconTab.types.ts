import { ICategory } from "@/types/Category";

export interface IconTabProps {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}