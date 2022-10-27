export class Address {
  
  private street: string; 
  private number: number = 0;
  private zip: string;
  private state: string; 
  
  constructor(street: string, number: number, zip: string, state: string) {
    this.street = street; 
    this.number = number; 
    this.zip = zip; 
    this.state = state; 

    this.validate(); 
  }

  private validate() {
    if(this.street.length === 0) {
      throw Error('State is required.'); 
    }
    
    if(this.number === 0) {
      throw Error('number is required.'); 
    }

    if(this.zip.length === 0) {
      throw Error('Zip code is required.'); 
    }

    if(this.state.length === 0) {
      throw Error('State is required.'); 
    }
  }
}