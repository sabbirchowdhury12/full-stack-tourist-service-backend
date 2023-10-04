import { Model } from "mongoose";

export interface ICows {
  name: string;
  age: number;
  price: number;
  location:
    | "Dhaka"
    | "Chattogram"
    | "Barishal"
    | "Rajshahi"
    | "Sylhet"
    | "Comilla"
    | "Rangpur"
    | "Mymensingh";
  breed:
    | "Brahman"
    | "Nellore"
    | "Sahiwal"
    | "Gir"
    | "Indigenous"
    | "Tharparkar"
    | "Kankrej";
  weight: number;
  label: "for sale" | "sold out";
  category: "Dairy" | "Beef" | "Dual Purpose";
  seller: string | undefined;
}

export type cowModel = Model<ICows>;
