import { Component } from '@angular/core';

@Component({
  selector: 'app-user-recovery',
  templateUrl: './user-recovery.component.html',
  styleUrls: ['./user-recovery.component.css']
})
export class UserRecoveryComponent {
  cedula: string = '';
  cedulaError: string | null = null;

  onSubmit() {
    if (this.validateCedula(this.cedula)) {
      // Lógica para manejar el envío del número de cédula
      console.log("Número de cédula enviado:", this.cedula);
      this.cedulaError = null; // Reseteamos el error si es correcto
    } else {
      this.cedulaError = 'Número de cédula inválido.';
    }
  }

  validateCedula(cedula: string): boolean {
    // Añadir lógica de validación según los requisitos de la cédula
    const cedulaPattern = /^[0-9]{10}$/; // Ejemplo de validación
    return cedulaPattern.test(cedula);
  }
}
