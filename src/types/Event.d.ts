interface IRegency { 
  id: string,
  name: string
}

interface IEvent {
  name: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  isPublished: boolean;
  description:string;
  startDate: string;
  endDate: string;
  location: {
    region: string,
    coordinate: {
      x: number,
      y: number
    }
  }
  banner: string | FileList
}

export {IEvent, IRegency}