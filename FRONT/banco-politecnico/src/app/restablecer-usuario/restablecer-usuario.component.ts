import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-restablecer-usuario',
  templateUrl: './restablecer-usuario.component.html',
  styleUrls: ['./restablecer-usuario.component.css']
})
export class RestablecerUsuarioComponent {

  nuevoUsuario: string = '';
  usuarioConfirmado: string = '';
  cedula: string = '';

  nuevoUsuarioError: string = '';
  usuarioConfirmadoError: string = '';

  

  private apiUrl: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cedula = params['cedula'];
      console.log('Cédula recibida:', this.cedula);
    });
  }

  goBack() {
    this.router.navigate(['/previous-route']);
  }

  changeUsuario() {
    this.validateNuevoUsuario(); // Validar nuevamente antes de proceder
  
      if (this.nuevoUsuarioError) {
          return; // No proceder si hay un error en el nombre de usuario
      }
  
    if (this.nuevoUsuario !== this.usuarioConfirmado) {
        this.usuarioConfirmadoError = 'El nombre de usuario no coincide. Por favor, inténtelo de nuevo.';
        return;
    }
  
    this.updateUsuario(this.cedula, this.nuevoUsuario)
        .then(() => {
            console.log('Username changed successfully.');
            this.router.navigate(['/confirmar-reseteo-username']);
        })
        .catch(error => {
            console.error('Error changing username: ', error);
            alert('Error al cambiar el nombre de usuario. Por favor, inténtelo de nuevo.');
        });
  }

  

  /*changeUsuario() {
    if (this.nuevoUsuario !== this.usuarioConfirmado) {
      alert('El nombre de usuario no coincide. Por favor, inténtelo de nuevo.');
      return;
    }

    if (!this.isUsernameValid(this.nuevoUsuario)) {
      alert('El Usuario no cumple con los requisitos de seguridad.');
      return;
    }

    this.updateUsuario(this.cedula, this.nuevoUsuario)
      .then(() => {
        console.log('Username changed successfully.');
        this.router.navigate(['/confirmar-reseteo-username']);
      })
      .catch(error => {
        console.error('Error changing username: ', error);
        alert('Error al cambiar el nombre de usuario. Por favor, inténtelo de nuevo.');
      });
  }*/

  isUsernameValid(username: string): boolean {
    // Esta expresión regular asegura que el nombre de usuario:
    // - Tiene entre 4 y 20 caracteres
    // - Incluye letras y números
    // - Puede contener guiones bajos (_) o puntos (.)
    // - No puede comenzar ni terminar con un guion bajo (_) o un punto (.)
    const usernameRegex = /^(?=.{4,20}$)(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9._]+(?<![_.])$/;
    return usernameRegex.test(username);
  }

  validateNuevoUsuario() {
    if (!this.isUsernameValid(this.nuevoUsuario)) {
        this.nuevoUsuarioError = 'El nombre de usuario no cumple con los criterios de seguridad.';
    } else {
        this.nuevoUsuarioError = ''; // Limpiar el mensaje de error si el usuario es válido
    }
  }
  
  validateUsuarioConfirmado() {
    if (this.usuarioConfirmado !== this.nuevoUsuario) {
        this.usuarioConfirmadoError = 'El nombre de usuario no coincide. Por favor, inténtelo de nuevo.';
    } else {
        this.usuarioConfirmadoError = ''; // Limpiar el mensaje de error si coinciden
    }
  }

  async updateUsuario(numeroIdentidad: string, nuevoUsuario: string): Promise<void> {
    try {
        console.log("numeroIdentidad: ", numeroIdentidad);
        console.log("Nuevo nombre de usuario en update: ", nuevoUsuario);
        const response = await this.http.put(
            `${this.apiUrl}/actualizar-usuario/${numeroIdentidad}`, 
            { usuario: nuevoUsuario } // Cambiamos a 'usuario' para que coincida con el esquema
        ).toPromise();
        console.log('Response:', response);
    } catch (error) {
        console.error('Error updating username:', error);
        throw error;
    }
}


  /*async updateUsuario(numeroIdentidad: string, usuario: string): Promise<void> {

    try {
      console.log("numeroIdentidad: ", numeroIdentidad);
      console.log("nombre de usuario en update: ", usuario);
      const response = await this.http.put(`${this.apiUrl}/update-usuario/${numeroIdentidad}`, { username: usuario }).toPromise();
      console.log('Response:', response);
    } catch (error) {
      console.error('Error updating username:', error);
      throw error;
    }
  }*/
}
