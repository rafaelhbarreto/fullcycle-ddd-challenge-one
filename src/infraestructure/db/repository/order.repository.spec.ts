import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../domain/entities/address";
import Customer from "../../../domain/entities/customer";
import Order from "../../../domain/entities/order";
import OrderItem from "../../../domain/entities/order-item";
import Product from "../../../domain/entities/product";
import CustomerModel from "../sequelize/model/customer.model";
import { OrderItemModel } from "../sequelize/model/order-item.model";
import { OrderModel } from "../sequelize/model/order.model";
import ProductModel from "../sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order unit tests", () => {
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
    sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  // Close the connection after each test.
  afterEach(async () => {
    await sequelize.close();
  });
  
  
  it("should create a order", async () => {
    const customerRepository = new CustomerRepository(); 

    // create a customer 
    const customer = new Customer('123', 'John doe'); 
    customer.changeAddress(new Address('rua',171,'74345555','GO'));
    await customerRepository.create(customer); 

    // create a product 
    const productRepository = new ProductRepository();
    const product = new Product('123', 'product name', 10); 
    await productRepository.create(product); 

    // create a order item 
    const orderItem = new OrderItem('123', product.name, product.price, product.id, 2); 

    // create a order 
    const orderRepository = new OrderRepository(); 
    const order = new Order('123', customer.id, [orderItem]); 

    await orderRepository.create(order); 

    // find the order on database and compare the result

    const orderModel = await OrderModel.findOne({
      where: {id: order.id},
      include: ['items']
    }); 
    

    expect(await orderModel.toJSON()).toStrictEqual({
      id: '123',
      customerId: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          order_id: '123',
          quantity: orderItem.quantity,
          productId: '123'
        }
      ]
    })
  });
}); 