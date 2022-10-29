import Product from "../../../domain/entities/product";
import product from "../../../domain/entities/product";
import ProductRepositoryInterface from "../../../domain/repository/product.respository.interface";
import ProductModel from "../sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async find(id: string): Promise<product> {
    const product = await ProductModel.findOne({where: {id}}); 

    return new Product(
      product.id,
      product.name,
      product.price,
    ); 
  }
  
  async findAll(): Promise<product[]> {
    const products = await ProductModel.findAll(); 

    return products.map(product => new Product(product.id, product.name, product.price));
  }
  
  async create(product: product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  async update(product: product): Promise<void> {
    await ProductModel.update({
      name: product.name,
      price: product.price
    }, {
      where: {id: product.id}
    }); 
  }
}