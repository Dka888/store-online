import { Product } from "./Product";

export const enum status {
    in_Cart ="in_cart",
    purchased = "purchased"}

export interface Basket {
    userId: string,
    productId: Product,
    quantity: number,
    status: status,
    _id: string,
}