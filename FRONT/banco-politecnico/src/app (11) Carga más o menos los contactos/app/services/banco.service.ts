import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private apiUrl = 'http://localhost:4000/'; // URL de tu servidor Express

  constructor(private http: HttpClient) { }

  getInicio(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inicio`);
  }

  saveUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nuevo-usuario`, usuario);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  updateUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${id}`);
  }
}
