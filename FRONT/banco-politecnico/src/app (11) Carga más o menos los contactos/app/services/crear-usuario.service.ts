import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearUsuarioService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl; // Asegúrate de que environment.apiUrl esté definido correctamente
  }

  compareUser(registrationForm: any): Observable<any> {
    console.log('Datos recibidos para crear usuario:', registrationForm);
    return this.http.post<any>(`${this.apiUrl}/crear-usuario`, registrationForm); // Asegúrate de que la ruta aquí sea correcta
  }
}
