import { Product } from "./product.interface";

export interface OrderDetailResponse {
    id: number;
    order_id: number;
    product: Product;
    price: number;
    number_of_products: number;
    total_money: number;
    color: string;
}