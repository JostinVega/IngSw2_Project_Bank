import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private _datos = [];

  get datos() {
    return [...this.datos];
  }

  constructor() { }
}
