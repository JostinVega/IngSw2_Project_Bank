import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from '../services/email.service'; // Importa el servicio de Email

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

  successMessage: string | null = null; // Variable para el mensaje de éxito

  constructor(private emailService: EmailService) {} // Inyecta el servicio de Email

  // Método para enviar el formulario
  submitForm() {
    if (this.contactForm.valid) {
      const { nombre, email, mensaje } = this.formData;
      const asunto = `Consulta de ${nombre}`;

      this.emailService.sendEmail(asunto, mensaje, email).subscribe(
        response => {
          console.log('Correo enviado con éxito:', response);
          const caseNumber = Math.floor(Math.random() * 1000000);
          this.successMessage = `Tu consulta se ha enviado con éxito. Número de caso: ${caseNumber}.`;
          this.contactForm.resetForm();
        },
        error => {
          console.error('Error al enviar el correo:', error);
          this.successMessage = 'Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo.';
        }
      );
    } else {
      alert('Debe aceptar la Política de Privacidad.');
    }
  }

  // Método para permitir solo letras en el campo de nombre
  allowOnlyLetters(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/^[a-zA-Z\s]*$/.test(inputChar)) {
      event.preventDefault();
    }
  }
}
