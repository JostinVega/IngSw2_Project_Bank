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
}
