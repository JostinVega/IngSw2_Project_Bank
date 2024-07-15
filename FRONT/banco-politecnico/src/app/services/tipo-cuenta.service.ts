/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  private cuentaNumero: string | undefined;
  private cuentaNombre: string | undefined;
  private tipoCuenta: string | undefined;
  //private registrationFrom={};

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl; // Asegúrate de que environment.apiUrl esté definido correctamente
  }

  setCuenta(numero: string, nombre: string, tipo: string) {
    this.cuentaNumero = numero;
    this.cuentaNombre = nombre;
    this.tipoCuenta = tipo;
  }

  getNumeroCuenta(): string | undefined {
    return this.cuentaNumero;
  }

  getNombreCuenta(): string | undefined {
    return this.cuentaNombre;
  }

  getTipoCuenta(): string | undefined {
    return this.tipoCuenta;
  }

  registrationForm = {
    numero: this.getNumeroCuenta(),
    nombre: this.getNombreCuenta(),
    tipo: this.getTipoCuenta()
  };

  saveAccount(): Observable<any> {
      console.log('Datos recibidos para registrar:', this.registrationForm);
      return this.http.post<any>(`${this.apiUrl}/tipo-cuenta`, this.registrationForm);
    
  }
}*/

/*// src/app/services/tipo-cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  private cuentaNumero: string | undefined;
  private cuentaNombre: string | undefined;
  private tipoCuenta: string | undefined;

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl; // Asegúrate de que environment.apiUrl esté definido correctamente
  }

  setCuenta(cuentaNumero: string, cuentaNombre: string, tipoCuenta: string) {
    this.cuentaNumero = cuentaNumero;
    this.cuentaNombre = cuentaNombre;
    this.tipoCuenta = tipoCuenta;
  }

  getCuenta() {
    return {
      cuentaNumero: this.cuentaNumero,
      cuentaNombre: this.cuentaNombre,
      tipoCuenta: this.tipoCuenta
    };
  }

  saveCuenta(registrationForm: any): Observable<any> {
    console.log('Datos recibidos para registrar:', registrationForm);
    return this.http.post<any>(`${this.apiUrl}/confirmar-registro`, registrationForm); // Asegúrate de que la ruta aquí sea correcta
  }
}*/

// src/app/services/tipo-cuenta.service.ts
/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  private cuentaNumero: string | undefined;
  private cuentaNombre: string | undefined;
  private tipoCuenta: string | undefined;

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl; // Asegúrate de que environment.apiUrl esté definido correctamente
  }

  setCuenta(cuentaNumero: string, cuentaNombre: string, tipoCuenta: string) {
    this.cuentaNumero = cuentaNumero;
    this.cuentaNombre = cuentaNombre;
    this.tipoCuenta = tipoCuenta;
  }

  getCuenta() {
    return {
      cuentaNumero: this.cuentaNumero,
      cuentaNombre: this.cuentaNombre,
      tipoCuenta: this.tipoCuenta
    };
  }

  saveCuenta(): Observable<any> {
    const registrationForm = this.getCuenta();
    console.log('Datos recibidos para registrar:', registrationForm);
    return this.http.post<any>(`${this.apiUrl}/confirmar-registro`, registrationForm); // Asegúrate de que la ruta aquí sea correcta
  }
}*/

// src/app/services/tipo-cuenta.service.ts
/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  private numeroCuenta: string | undefined;
  private cuentaNombre: string | undefined;
  private tipoCuenta: string | undefined;

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl; // Asegúrate de que environment.apiUrl esté definido correctamente
  }

  setCuenta(cuentaNumero: string, cuentaNombre: string, tipoCuenta: string) {
    this.numeroCuenta = cuentaNumero;
    this.cuentaNombre = cuentaNombre;
    this.tipoCuenta = tipoCuenta;
  }

  getCuenta() {
    return {
      numeroCuenta: this.numeroCuenta,
      cuentaNombre: this.cuentaNombre,
      tipoCuenta: this.tipoCuenta
    };
  }

  saveCuenta(registrationForm: any): Observable<any> {
    console.log('Datos recibidos para registrar:', registrationForm);
    return this.http.post<any>(`${this.apiUrl}/tipo-cuenta`, registrationForm); // Asegúrate de que la ruta aquí sea correcta
  }
}
*/

// tipo-cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  private accountData: any = {};

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  setAccountData(data: any) {
    this.accountData = data;
  }

  getAccountData() {
    return this.accountData;
  }

  saveCuenta(registrationForm: any): Observable<any> {
    console.log('Datos recibidos para registrar:', registrationForm);
    return this.http.post<any>(`${this.apiUrl}/tipo-cuenta`, registrationForm);
  }
}



