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
    const item1 = new OrderItem('id_1', 'name_1', 10, 'prod_1', 1); 
    const item2 = new OrderItem('id_2', 'name_2', 20, 'prod_2', 2);
    
    const order = new Order('id_1', 'cus_1', [item1, item2]); 
    expect(50).toBe(order.total()); 
  });

  it('should be invalid when the item quantity is less than zero', () => {
    

    expect(() => {
      const item1 = new OrderItem('id_1', 'name_1', 10, '123', -1);
      const order = new Order('134', 'cus_1', [item1]); 

    }).toThrowError('Item quantity must be greather than zero');
  });

}); 