import Product from "../entities/product";
import ProductService from "./product.service";

describe('Product service unit tests', () => {
  it('should increase product price', () => {
    const product1 = new Product('123', 'Product 1', 10); 
    const product2 = new Product('123', 'Product2', 20);
    const product3 = new Product('123', 'Product3', 30);
    const products = [product1, product2, product3]; 

    ProductService.increasePrice(products, 50);
    
    expect(product1.price).toBe(15);
    expect(product2.price).toBe(30);
    expect(product3.price).toBe(45);
  }); 
}); 