import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  changePassword(numeroIdentidad: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/actualizarContrasena/${numeroIdentidad}`, payload);
  }

  verifySecurityCode(numero_identidad: string, enteredCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/verifySecurityCode`, { numero_identidad, enteredCode });
  }
}
