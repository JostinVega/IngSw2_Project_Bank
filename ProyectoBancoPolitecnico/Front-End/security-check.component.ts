//Este código se debe agregar al archivo ts encargado en el frontend de la verificacion
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-security-check',
  templateUrl: './security-check.component.html'
})
export class SecurityCheckComponent {
  securityCode: string = '';
  userId: string = '12345'; //Se debe obtener este ID 
  phoneNumber: string = '1234567890'; //Se debe obtener el número telefónico
  message: string = '';

  constructor(private http: HttpClient) {}

  sendSecurityCode() {
    this.http.post('http://localhost:3000/send-security-code', { userId: this.userId, phoneNumber: this.phoneNumber })
      .subscribe(
        response => {
          this.message = 'Código de seguridad enviado.';
        },
        error => {
          this.message = 'Error al enviar el código de seguridad.';
        }
      );
  }

  verifySecurityCode() {
    this.http.post('http://localhost:3000/verify-security-code', { userId: this.userId, enteredCode: this.securityCode })
      .subscribe(
        response => {
          this.message = 'Código de seguridad verificado correctamente.';
        },
        error => {
          if (error.status === 403) {
            this.message = error.error.message;
          } else {
            this.message = 'Error al verificar el código de seguridad.';
          }
        }
      );
  }
}
