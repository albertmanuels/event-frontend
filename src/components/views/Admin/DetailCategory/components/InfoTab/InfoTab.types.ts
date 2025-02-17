import { ICategory } from "@/types/Category";

export interface InfoTabProps {
  dataCategory: ICategory;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}
