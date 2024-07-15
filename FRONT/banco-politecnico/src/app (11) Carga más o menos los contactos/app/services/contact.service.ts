/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:4000'; // Cambia la URL a tu servidor backend

  constructor(private http: HttpClient) { }

  getContacts(numeroIdentidad: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ver-contacto/${numeroIdentidad}`);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/nuevo-contacto`, contact);
  }

  checkAccountExists(accountNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/verificarCuenta/${accountNumber}`);
  }

  markAsFavorite(accountNumber: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/contacto-favorito`, { accountNumber });
  }
}
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:4000'; // Cambia la URL a tu servidor backend

  constructor(private http: HttpClient) { }

  getContacts(numeroIdentidad: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ver-contacto/${numeroIdentidad}`);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/nuevo-contacto`, contact);
  }

  checkAccountExists(accountNumber: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/verificarCuenta/${accountNumber}`);
  }

  markAsFavorite(accountNumber: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/contacto-favorito`, { accountNumber });
  }
}
