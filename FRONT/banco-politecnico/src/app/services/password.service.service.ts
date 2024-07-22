import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = '/api/usuario';

  constructor(private http: HttpClient) {}

  changePassword(numeroIdentidad: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizarContrasena/${numeroIdentidad}`, payload);
    
  }
  verifySecurityCode(numero_identidad: string, enteredCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/verifySecurityCode`, { numero_identidad, enteredCode });
  }
  
}
