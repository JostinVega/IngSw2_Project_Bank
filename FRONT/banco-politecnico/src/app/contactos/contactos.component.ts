import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent {
  @ViewChild('contactForm') contactForm!: NgForm;

  formData = {
    nombre: '',
    email: '',
    mensaje: '',
    privacidad: false
  };

  // Método para enviar el formulario
  submitForm() {
    if (this.formData.privacidad) {
      console.log('Formulario enviado:', this.formData);
      // Aquí puedes implementar la lógica para enviar el formulario
      alert('Su solicitud ha sido enviada correctamente.');
      // Restablecer el formulario y su estado de validación
      this.contactForm.resetForm();
    } else {
      console.log('Debe aceptar la Política de Privacidad.');
    }
  }

  // Método para permitir solo letras en el campo de nombre
  allowOnlyLetters(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/^[a-zA-Z\s]*$/.test(inputChar)) {
      // Prevent the default action if the character is not a letter or space
      event.preventDefault();
    }
  }
}
