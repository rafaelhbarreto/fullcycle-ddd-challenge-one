export class Address {
  
  private _street: string; 
  private _number: number = 0;
  private _zip: string;
  private _state: string; 
  
  constructor(street: string, number: number, zip: string, state: string) {
    this._street = street; 
    this._number = number; 
    this._zip = zip; 
    this._state = state; 

    this.validate(); 
  }

  private validate() {
    if(this._street.length === 0) {
      throw Error('State is required.'); 
    }
    
    if(this._number === 0) {
      throw Error('number is required.'); 
    }

    if(this._zip.length === 0) {
      throw Error('Zip code is required.'); 
    }

    if(this._state.length === 0) {
      throw Error('State is required.'); 
    }
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get state(): string {
    return this._state;
  }
}