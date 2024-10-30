import { StaticImageData } from "next/image";

export interface OrderInfo {
  items: string[];
  deliveryCost: number;
  to: string;
  when: string;
  address: string;
  photo?:StaticImageData
}
