import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order-item";

export default class OrderService {

  public static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if(items.length === 0) {
      throw new Error('Order must have at least one item'); 
    }

    const order = new Order('123', customer.id, items); 

    customer.addRewardPoints(order.total() / 2);
    
    return order;
  }

  public static getTotal(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0); 
  }
}