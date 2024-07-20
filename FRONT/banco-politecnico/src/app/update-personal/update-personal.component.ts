import { Component } from '@angular/core';

@Component({
  selector: 'app-update-personal',
  templateUrl: './update-personal.component.html',
  styleUrls: ['./update-personal.component.css']
})
export class UpdatePersonalComponent {
  email: string = '';
  phone: string = '';
  emailError: string | null = null;
  phoneError: string | null = null;

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  validatePhone(phone: string): boolean {
    const phonePattern = /^\+?[0-9]{10,13}$/;
    return phonePattern.test(phone);
  }

  onSubmit(): void {
    this.emailError = null;
    this.phoneError = null;

    if (!this.validateEmail(this.email)) {
      this.emailError = 'Por favor ingrese un correo electrónico válido.';
    }

    if (!this.validatePhone(this.phone)) {
      this.phoneError = 'Por favor ingrese un número de teléfono válido.';
    }

    if (!this.emailError && !this.phoneError) {
      // Aquí iría la lógica para enviar los datos actualizados al servidor
      console.log('Correo Electrónico:', this.email);
      console.log('Número de Teléfono:', this.phone);
      alert('Información actualizada exitosamente.');
    }
  }

  goBack(): void {
    // Aquí iría la lógica para manejar el botón de retroceso, por ejemplo, navegación a otra ruta
    console.log('Navegar de regreso a la página anterior');
  }
}
