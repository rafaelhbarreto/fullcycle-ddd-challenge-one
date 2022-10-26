import { Address } from "./address";

export default class Customer 
{
    private _id: string; 
    private _name: string; 

    // The address can initialize empty
    private _address!: Address; 
    private _active: boolean = false; 

    constructor(id: string, name: string) {
        this._id = id; 
        this._name = name;

        this.validate(); 
    }

    private validate() {
      if (this._id.length === 0) {
        throw new Error ("ID is required."); 
      }

      if(this._name.length === 0) {
        throw new Error ("Name is required."); 
      }
    }

    public changeName(name: string) {
        this._name = name; 
        this.validate(); 
    }

    get name(): string {
      return this._name;
    }

    public activate() {

      if (this._address === undefined) {
        throw new Error("Address is required to activate the customer.");
      }

      this._active = true; 
    }

    public isActive(): boolean {
      return this._active; 
    }

    public deactivate() {
        this._active = false;
    }

    public setAddress(address: Address) {
      this._address = address;
    }
}