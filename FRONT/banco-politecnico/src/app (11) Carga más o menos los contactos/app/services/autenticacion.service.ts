import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
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
}


//Providers:[AutenticacionService]

//private 