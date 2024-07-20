import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniqueNumberServiceService {
  private generatedNumbers = new Set<number>();

  constructor() {}

  generateUniqueNumber(): number {
    let uniqueNumber;
    do {
      uniqueNumber = Math.floor(10000000 + Math.random() * 90000000);
    } while (this.generatedNumbers.has(uniqueNumber));
    
    this.generatedNumbers.add(uniqueNumber);
    return uniqueNumber;
  }
}