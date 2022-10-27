import OrderItem from "./order-item";

export default class Order {
  private _id: string; 
  private _customerId: string; 
  private _items: OrderItem[]; 
  private _total: number = 0; 

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId; 
    this._items = items;

    this.validate();
  }

  private validate() {
    if (this._id.length === 0) {
      throw new Error('ID is required');
    }

    if (this._customerId.length === 0) {
      throw new Error('customer id is required');
    }
    
    if (this._items.length === 0) {
      throw new Error('Items are required');
    }

    if(this._items.some(item => item.quantity < 0)) {
      throw new Error('Item quantity must be greather than zero');
    }
  }

  public total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0); 
  }
}