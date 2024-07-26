import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmarCuentaService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  setCuenta(accountData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nueva-cuenta`, accountData);
  }

  crearCuenta(cuentaData: { 
    numeroIdentidad: string | undefined; 
    numeroCuenta: string | undefined; 
    cuentaNombre: string | undefined; 
    tipoCuenta: string | undefined;
    saldo: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/nuevaCuenta`, cuentaData);
  }
}

