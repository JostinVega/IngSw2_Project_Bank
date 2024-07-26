import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  obtenerTodosLosUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/usuarios`);
  }

  obtenerTodasLasCuentas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/cuentas`);
  }

  getUsuarioByNumeroIdentidad(numeroIdentidad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUsuarioByNumeroIdentidad/${numeroIdentidad}`);
  }

  getCuentaByNumeroCuent(numeroCuenta: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtenerCuentaByNumeroIdentidad/${numeroCuenta}`);
  }

  actualizarAdminYEstado(numeroIdentidad: string, administrador: boolean, estado: string): Observable<any> {
    const url = `${this.apiUrl}/actualizar-admin-estado/${numeroIdentidad}`;
    const body = { administrador, estado };

    return this.http.put<any>(url, body);
  }

  eliminarUsuario(numeroIdentidad: string): Observable<any> {
    const url = `${this.apiUrl}/eliminar-usuario/${numeroIdentidad}`;
    return this.http.delete<any>(url);
  }

  guardarCuenta(accountData: { 
    numeroIdentidad: string, 
    //accountType: string, 
    numeroCuenta: string, 
    cuentaNombre: string, 
    tipoCuenta: string, 
    saldo: string 
}): Observable<any> {
    const url = `${this.apiUrl}/nuevaCuenta`;
    return this.http.post<any>(url, accountData);
}

  
}
