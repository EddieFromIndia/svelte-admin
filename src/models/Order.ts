import type { OrderItem } from "./OrderItem"

export class Order {
    id!: number;
    name!: string;
    email!: string;
    total!: number;
    order_items!: OrderItem[];
}