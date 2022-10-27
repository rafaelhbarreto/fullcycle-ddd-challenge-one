export default class Product {
  private _id: string; 
  private _name: string; 
  private _price: number; 

  constructor(id: string, name: string, price: number) {
    this._id = id; 
    this._name = name; 
    this._price = price; 

    this.validate(); 
  }

  private validate(): boolean {
    
    if (this._id.length === 0) {
      throw new Error('ID is required'); 
    }
    
    if (this._name.length === 0) {
      throw new Error('Name is required'); 
    }
    
    if (this._price === 0) {
      throw new Error('Price'); 
    }
    
    if (!this._price || this._price < 0) {
      throw new Error('Product price must be greather than zero'); 
    }

    return true;
  }

  get name(): string {
    return this._name; 
  }

  get price(): number {
    return this._price;
  }

  public changeName(name: string) {
    this._name = name; 
    this.validate(); 
  }

  public changePrice(price: number) {
    this._price = price; 
    this.validate(); 
  }
}