/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://bancopolitecnico-backend.vercel.app';

  constructor(private http: HttpClient) {}

  login(credentials: { usuario: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}
*/

/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://bancopolitecnico-backend.vercel.app';

  constructor(private http: HttpClient) {}

  login(credentials: { usuario: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  setLoggedIn(value: boolean): void {
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  private loggedIn = false;  // Definir la propiedad loggedIn
  private nombreUsuario: string = '';  // Definir la propiedad nombreUsuario

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  login(credentials: { usuario: string; contrasena: string }): Observable<any> {
    console.log('Usuario ingresado:', credentials.usuario);
    return this.http.get<any>(`${this.apiUrl}/obtenerInfoUsuario/`+credentials.usuario);
  }

  setLoggedIn(value: boolean, nombreUsuario: string = ''): void {
    this.loggedIn = value;
    this.nombreUsuario = nombreUsuario;
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
    localStorage.setItem('nombreUsuario', nombreUsuario);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getNombreUsuario(): string {
    return localStorage.getItem('nombreUsuario') || '';
  }
}


