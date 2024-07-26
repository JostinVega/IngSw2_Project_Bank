import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

  getContacts(numeroIdentidad: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ver-contacto/${numeroIdentidad}`);
  }

  checkAccountExists(accountNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verificarCuenta/${accountNumber}`);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nuevo-contacto`, contact);
  }

  updateIsFavoriteByNumeroCuenta(numeroCuenta: string, isFavorite: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateIsFavoriteByNumeroCuenta/${numeroCuenta}`, { isFavorite });
  }

  deleteContactByNumeroCuenta(numeroCuenta: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteContactoByNumeroCuenta/${numeroCuenta}`);
  }

  checkContactExistsByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactoExistePorNombre/${name}`);
  }

  checkContactExistsByAccountNumber(accountNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/contactoExistePorNumeroCuenta/${accountNumber}`);
  }

  getIdCuenta(numeroCuenta: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/idCuenta/${numeroCuenta}`);
  }

  getNombrexId(numeroIdentidad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nombreCompleto/${numeroIdentidad}`);
  }
}
