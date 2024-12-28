import { Category } from "./category.interface";

export interface Product {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    category: Category | null;
    isActive: boolean;
}
