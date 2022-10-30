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

  it('should update a order', async () => {
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

    // update 

    product.changeName('another name'); 
    product.changePrice(50); 

    const orderItemUpdate = new OrderItem('1234', product.name, product.price, product.id, 3); 
    const orderUpdate = new Order('123', customer.id, [orderItemUpdate]); 
    await orderRepository.update(orderUpdate);
    
    // find and compare 

    const orderModel = await OrderModel.findOne({
      where: {id: orderUpdate.id},
      include: ["items"]
    });


    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customerId: customer.id,
      total: orderUpdate.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          productId: orderItem.productId,
        },
      ],
    });
  });

  it("should find a order", async () => {
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
    const orderItem = new OrderItem(
      '123', 
      product.name, 
      product.price,
      product.id, 
      1
    ); 

    // create a order 
    const orderRepository = new OrderRepository(); 
    const order = new Order('123', customer.id, [orderItem]); 

    await orderRepository.create(order); 

    const foundOrder = await orderRepository.find(order.id);

    expect(order).toEqual(foundOrder);
  });


  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    
    const product2 = new Product("456", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );

    const order2 = new Order("456", "123", [orderItem2]);
    await orderRepository.create(order2);

    const foundAllOrders = await orderRepository.findAll();

    expect(foundAllOrders).toHaveLength(2);
    expect(foundAllOrders).toContainEqual(order);
    expect(foundAllOrders).toContainEqual(order2);
  });

}); 