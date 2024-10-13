import { StaticImageData } from "next/image";
export interface Reviews {
  id: number;
  name: string;
  avatar: null | StaticImageData;
  date: Date;
  rates:number[],
  images: StaticImageData[];
}

export interface ProductCard {
  id: number;
  slug: string,
  images: (string | StaticImageData)[];
  isFavourite: boolean;
  title: string;
  rating: number;
  reviewsNumber: number;
  oldPrice: number;
  currentPrice: number;
  dimensions?: [number, number];
  availableConfirm: Date;
  type?:string,
  composition?: {
    id: number;
    title: string;
    value: number;
    unit: string;
  }[];
  reviews?: Reviews[];
}
