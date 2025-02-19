import { DateValue } from "@nextui-org/react";

interface IRegency { 
  id: string,
  name: string
}

interface IEvent {
  name: string;
  slug: string;
  category: string;
  isFeatured: string;
  isPublished: string;
  description:string;
  startDate: DateValue | string;
  endDate: DateValue | string;
  region: string,
  longitude: string,
  latitude: string,
  banner: string | FileList
}

export {IEvent, IRegency}