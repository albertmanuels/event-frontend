import { ReactNode } from "react";

export type TIconList = {[key: string]: ReactNode}

export interface IToaster {
  type: string;
  message: string;
}