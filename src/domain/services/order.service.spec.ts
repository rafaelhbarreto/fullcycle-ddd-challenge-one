import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order-item";
import OrderService from "./order.service";

describe('Order service unit tests', () => {

  it('should pace a order', () => {

    const customer = new Customer('123', 'John doe'); 
    const item1 = new OrderItem('123', 'Item 1', 100, 'product 1', 1); 

    const order = OrderService.placeOrder(customer, [item1]); 

    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });

  it('should get the total price of a order', () => {
    const item1 = new OrderItem('123', 'Item 1', 100, 'product 1', 1); 
    const item2 = new OrderItem('123', 'Item 2', 200, 'product 2', 2); 

    const order1 = new Order('123', 'customer_1', [item1]); 
    const order2 = new Order('123', 'customer_2', [item2]); 

    expect(OrderService.getTotal([order1, order2])).toBe(500); 
  });
}); 