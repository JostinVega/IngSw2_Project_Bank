import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

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
