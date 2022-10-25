import OrderItem from "./order-item";

export default class Order {
  private id: string; 
  private customer_id: string; 
  private items: OrderItem[]; 

  constructor(id: string, customer_id: string, items: OrderItem[]) {
    this.id = id;
    this.customer_id = customer_id; 
    this.items = items;
  }
}