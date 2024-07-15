/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:4000'; // Cambia esto si es necesario

  private registrationData: any = {};

  constructor(private http: HttpClient) {}

  setRegistrationData(step: string, data: any): void {
    this.registrationData[step] = data;
  }

  getAllData(): any {
    return this.registrationData;
  }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nuevo-usuario`, data);
  }

  // Otros métodos para manejar las solicitudes HTTP
}
*/

/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:4000'; // Cambia esto si es necesario

  private registrationData: any = {};

  constructor(private http: HttpClient) {}

  setRegistrationData(step: string, data: any): void {
    this.registrationData[step] = data;
  }

  getAllData(): any {
    return this.registrationData;
  }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nuevo-usuario`, data);
  }

  setCuenta(data: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/nueva-cuenta`, data);
  }
}
*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:4000'; // Cambia esto si es necesario

  private registrationData: any = {};

  constructor(private http: HttpClient) {}

  setRegistrationData(step: string, data: any): void {
    this.registrationData[step] = data;
  }

  getAllData(): any {
    return this.registrationData;
  }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nuevo-usuario`, data);
  }

  setCuenta(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/nueva-cuenta`, data);
  }
}
