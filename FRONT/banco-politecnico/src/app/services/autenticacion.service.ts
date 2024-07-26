import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.apiUrl = environment.apiUrl; // Asegúrate de que environment.apiUrl esté definido correctamente
  }

  obtenerCedula(usuario: any): Observable<any>{
    console.log('Usuario ingresado:', usuario);
    return this.http.get<any>(`${this.apiUrl}/obtenerInfoUsuario/`+usuario);
  }

  obtenerCredenciales(usuario: any): Observable<any>{
    console.log('Usuario ingresado:', usuario);
    return this.http.get<any>(`${this.apiUrl}/obtenerUsuario/`+usuario);
  }

  logout() {
    // Implementar el cierre de sesión, por ejemplo, eliminar tokens o limpiar sesión
    console.log('Cerrando sesión');
    // Aquí puedes limpiar cualquier dato de sesión almacenado, por ejemplo:
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/home']);
  }
}


//Providers:[AutenticacionService]

//private 