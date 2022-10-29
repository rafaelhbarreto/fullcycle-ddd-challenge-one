import { Sequelize } from 'sequelize-typescript'; 
import Product from '../../../domain/entities/product';
import ProductModel from '../sequelize/model/product.model';
import ProductRepository from './product.repository';

describe('Product repository test', () => {
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
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  // Close the connection after each test.
  afterEach(async () => {
    await sequelize.close();
  }); 

  it('should create a product', async () => {
    const productRepository = new ProductRepository(); 
    const product = new Product('1', 'Product 1', 100); 

    await productRepository.create(product); 

    const productModel = await ProductModel.findOne({where: {id: "1"}});

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100
    });
  }); 

  it('should update a product', async () => {
    const productRepository = new ProductRepository(); 
    const product = new Product('1', 'Product 1', 100); 

    await productRepository.create(product);

    product.changeName('another name'); 
    product.changePrice(200); 

    await productRepository.update(product); 
    const updatedProduct =  await ProductModel.findOne({where: {
      id: product.id
    }}); 

    const foundProductByRepo = await productRepository.find(product.id);

    expect (updatedProduct.toJSON()).toStrictEqual({
      id: foundProductByRepo.id,
      name: foundProductByRepo.name,
      price: foundProductByRepo.price
    })
    
  });

  it('should find all products', async () => {
    const product1 = new Product('123', 'Product1', 100); 
    const product2 = new Product('1234', 'Product 2', 200); 
    const products: Product[] = [product1, product2]; 

    const productRepository = new ProductRepository(); 
    await productRepository.create(product1);
    await productRepository.create(product2);

    const foundedProducts = await productRepository.findAll(); 

    expect(foundedProducts).toEqual(products);
  });

});