import Product from "../entities/product";

export default class ProductService {
  public static increasePrice(products: Array<Product>, percentage: number): void {
    products.forEach(product => product.changePrice(product.price * (percentage/100) + product.price));
  }
}