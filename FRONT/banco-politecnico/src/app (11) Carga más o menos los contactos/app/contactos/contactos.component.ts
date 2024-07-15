// contactos.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent {
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    mensaje: '',
    privacidad: false
  };

  // Método para enviar el formulario
  submitForm() {
    // Aquí puedes implementar la lógica para enviar el formulario
    console.log('Formulario enviado:', this.formData);
    // Puedes restablecer el formulario después de enviarlo si es necesario
    // this.resetForm();
  }

  // Aquí podrías implementar métodos adicionales si los necesitas
}
