import Product from "./product";

describe("Product unit tests", () => {

  it('should throw a error when ID is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 10); 
    }).toThrowError('ID is required'); 
  }); 

  it('should throw a error when name is empty', () => {
    expect(() => {
      const product = new Product('123', '', 20);
    }).toThrowError('Name is required'); 
  });

  it('should throw a error when price is less than zero', () => {
    expect(() => {
      const product = new Product('123', 'Product 1', -1);
    }).toThrowError('Product price must be greather than zero'); 
  });

  it('should change product name', () => {
    const product = new Product('123', 'Product name', 10); 
    product.changeName('another name'); 

    expect('another name').toBe(product.name);
  });

  it('should change product price', () => {
    const product = new Product('124', 'Product name', 10); 
    product.changePrice(20); 

    expect(20).toBe(product.price); 
  });

}); 