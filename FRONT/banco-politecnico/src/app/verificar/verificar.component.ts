import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from '../services/password.service.service';


import { RegistroService } from '../services/informacion-registro.service';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css']
})
export class VerificarComponent {
  codigo: string[] = ['', '', '', '', ''];
  numero_identidad: string = ''; // Asegúrate de obtener este valor del usuario

  constructor(
    private registroService: RegistroService, 
    private passwordService: PasswordService, 
    private router: Router
  ) {}

  onSubmit(): void {
    // Verificar el código ingresado
    const enteredCode = this.codigo.join('');
    this.passwordService.verifySecurityCode(this.numero_identidad, enteredCode).subscribe(
      response => {
        if (response.message === 'Código de seguridad verificado correctamente.') {
          this.router.navigate(['/siguiente-pagina']);
        } else {
          response.errorMessage = 'Código inválido. Por favor, inténtelo de nuevo.';
        }
      },
      error => {
        // Manejar errores
        error.errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo.';
      }
    );
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (!/^\d$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById('digit' + (index)) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (event.key === 'ArrowRight' && index < this.codigo.length - 1) {
      const nextInput = document.getElementById('digit' + (index + 2)) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (event.key === 'Backspace' && index > 0 && input.value === '') {
      const prevInput = document.getElementById('digit' + (index)) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (/^\d$/.test(input.value)) {
      this.codigo[index] = input.value;
      if (index < this.codigo.length - 1) {
        const nextInput = document.getElementById('digit' + (index + 2)) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      input.value = '';
    }
  }

  goBack(): void {
    window.history.back();
  }

  resendCode(): void {
    alert('Se ha reenviado el código de verificación.');
  }
}
