import { Sequelize } from 'sequelize-typescript'; 
import ProductModel from '../sequelize/model/product.model';

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
});