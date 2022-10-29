import { Address } from "../../../domain/entities/address";
import Customer from "../../../domain/entities/customer";
import customer from "../../../domain/entities/customer";
import CustomerRepositoryInterface from "../../../domain/repository/customer.repository.interface";
import CustomerModel from "../sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

  /**
   * Create a customer 
   * 
   * @param customer 
   */
  async create(customer: customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      rewardPoints: customer.rewardPoints,
      active: customer.isActive(),

      // address 
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      state: customer.address.state,
    });
  }

  /**
   * Update a customer. 
   * 
   * @param customer 
   */
  async update(customer: customer): Promise<void> {
    await CustomerModel.update({
      id: customer.id,
      name: customer.name,
      rewardPoints: customer.rewardPoints,
      active: customer.isActive(),

      // address 
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      state: customer.address.state,
    }, {
      where: {id: customer.id}
    });
  }

  /**
   * Find a customer to given id. Thrown a error if not found.
   * @param id 
   * @returns 
   */
  async find(id: string): Promise<customer> {
    let customerModel; 

    try {
      customerModel = await CustomerModel.findOne({
        where: {id}, 
        rejectOnEmpty: true
      }); 
    } catch(err) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(customerModel.id, customerModel.name); 

    customer.setAddress(new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.state
    ));
    
    return customer; 
  }

  /** 
   * Returns all customers 
   * 
   */
  async findAll(): Promise<customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map(customerModel => {
      const customer = new Customer(customerModel.id, customerModel.name); 
      customer.addRewardPoints(customerModel.rewardPoints);

      customer.setAddress(new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.state
      ));
      
      return customer; 
    });
  }
}