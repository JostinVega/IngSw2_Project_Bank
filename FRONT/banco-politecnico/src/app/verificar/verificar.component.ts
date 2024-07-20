import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { RegistroService } from '../services/informacion-registro.service';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css']
})
export class VerificarComponent {
  digits: string[] = ['', '', '', '', ''];

  constructor(
    private registroService: RegistroService,
    private router: Router
  ) {}

  onSubmit(): void {
    // Verificar el código ingresado
    const verificationCode = this.digits.join('');
    // Supongamos que el código de verificación es '12345'
    if (verificationCode === '12345') {
      this.router.navigateByUrl('/crear-usuario');
    } else {
      alert('Código de verificación incorrecto');
    }
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
    } else if (event.key === 'ArrowRight' && index < this.digits.length - 1) {
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
      this.digits[index] = input.value;
      if (index < this.digits.length - 1) {
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
