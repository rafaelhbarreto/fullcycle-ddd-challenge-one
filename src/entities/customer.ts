export default class Customer 
{
    private id: string; 
    private name: string; 
    private address: string; 
    private active: boolean = true; 

    constructor(id: string, name: string, address: string) {
        this.id = id; 
        this.name = name; 
        this.address = address; 
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
}