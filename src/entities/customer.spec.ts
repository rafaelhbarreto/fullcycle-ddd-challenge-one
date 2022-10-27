import { Address } from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {  
  
  it("should be throw a error when id of customer is empty", () => {
    expect(() => {
      const customer = new Customer("", "John doe"); 
    }).toThrowError("ID is required."); 
  });
  
  it("should be throw a error when name of customer is empty", () => {
    expect(() => {
      const customer = new Customer("123", ""); 
    }).toThrowError("Name is required."); 
  });
  
  it("should change name of customer", () => {
    const customer = new Customer('123', 'John doe'); 
    customer.changeName('John'); 

    expect(customer.name).toBe('John'); 
  });

  it("should activate a customer", () => {
    const customer = new Customer('123', 'John Doe'); 
    const address = new Address('Street 1', 1, '928420', 'Goiás'); 

    customer.setAddress(address); 
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it("should throw a error when try activate a customer without address", () => {
    expect(() => {
      const customer = new Customer("123", "John doe"); 
      customer.activate();
    }).toThrowError("Address is required to activate the customer."); 
  });

  it("should deactivate a customer", () => {
    const customer = new Customer("123", 'John doe');
    customer.deactivate(); 

    expect(customer.isActive()).toBe(false); 
  }); 

  it('should add reward points', () => {
    const customer = new Customer('123', 'John doe'); 
    expect(customer.rewardPoints).toBe(0); 
    
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10); 
    
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20); 
  });
  

}); 