import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit tests", () => {

  it('should be invalid when the order id is empty', () => {
    expect(() => {
      const order = new Order('', 'John doe', []);
    }).toThrowError('ID is required'); 
  });

  it('should be invalid when the customer id is empty', () => {
    expect(() => {
      const order = new Order('123', '', []); 
    }).toThrowError('customer id is required')
  })

  it('should be invalid when the order no have items', () => {
    expect(() => {
      const order = new Order('123', '123', []); 
    }).toThrowError('Items are required');
  }); 

  it('should calculate the total value of items', () => {
    const item1 = new OrderItem('id_1', 'name_1', 10); 
    const item2 = new OrderItem('id_2', 'name_2', 20);
    
    const order = new Order('id_1', 'cus_1', [item1, item2]); 
    expect(order.total()).toBe(30); 
  });
}); 