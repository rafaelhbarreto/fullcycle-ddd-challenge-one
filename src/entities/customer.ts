import { Address } from "./address";

export default class Customer 
{
    private id: string; 
    private name: string; 

    // The address can initialize empty
    private address!: Address; 
    private active: boolean = true; 

    constructor(id: string, name: string) {
        this.id = id; 
        this.name = name;
    }

    public changeName(name: string) {
        this.name = name; 
    }

    public activate() {
        this.active = true; 
    }

    public deactivate() {
        this.active = false;
    }

    public setAddress(address: Address) {
      this.address = address;
    }
}