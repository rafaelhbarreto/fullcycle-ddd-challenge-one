import { Sequelize } from 'sequelize-typescript';
import { Address } from '../../../domain/entities/address';
import Customer from '../../../domain/entities/customer';
import CustomerModel from "../sequelize/model/customer.model";
import CustomerRepository from './customer.repository';

describe("Customer repository test", () => {

  let sequelize: Sequelize;
  
  // Open the connectio befor each test
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    });

    // Add models and sync 
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  // Close the connection after each test.
  afterEach(async () => {
    await sequelize.close();
  }); 

  it('should create a customer', async () => {
    
    const customerRepository = new CustomerRepository();

    const customer = new Customer('123', 'John doe');
    customer.addRewardPoints(20); 
    customer.setAddress(new Address('rua', 171, '1234567', 'Goiás')); 

    await customerRepository.create(customer); 

    const customerModel = await CustomerModel.findOne({where: {id: customer.id}}); 

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name, 
      rewardPoints: customer.rewardPoints,
      active: customer.isActive(),

      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      state: customer.address.state
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('123', 'John doe');
    customer.addRewardPoints(20); 
    customer.setAddress(new Address('rua', 171, '1234567', 'Goiás')); 

    await customerRepository.create(customer); 

    customer.changeName('Rafael'); 
    customer.addRewardPoints(10); 

    await customerRepository.update(customer); 

    const customerModel = await CustomerModel.findOne({where: {id: customer.id}}); 

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: 'Rafael', 
      rewardPoints: 30,
      active: customer.isActive(),

      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      state: customer.address.state
    });
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer('123', 'John doe');
    customer1.addRewardPoints(10); 
    customer1.setAddress(new Address('rua', 171, '1234567', 'Goiás')); 
    
    const customer2 = new Customer('1234', 'Doe John');
    customer2.addRewardPoints(20); 
    customer2.setAddress(new Address('rua', 171, '1234567', 'Goiás')); 

    const customers: Customer[] = [customer1, customer2]; 

    await customerRepository.create(customer1); 
    await customerRepository.create(customer2);
    
    const customerModels = await customerRepository.findAll(); 
    
    expect(customerModels).toEqual(customers);
  }); 

}); 