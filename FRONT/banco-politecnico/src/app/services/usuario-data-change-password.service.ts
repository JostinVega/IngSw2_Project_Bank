import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDataChangePasswordService {
  private usuarioData: any = {};

  constructor() {}

  setUsuarioData(data: any): void {
    this.usuarioData = data;
  }

  getUsuarioData(): any {
    return this.usuarioData;
  }
}
