import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.css']
})
export class VerifyIdentityComponent {

  digits: string[] = ['', '', '', '', ''];
  cedula: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cedula = params['cedula'];
      console.log('Cédula recibida:', this.cedula);
    });
  }

  onSubmit(): void {
    // Lógica para manejar la sumisión del formulario
    console.log('Formulario enviado', this.digits.join(''));
    // Redirige al componente Reset pasando la cédula
    this.router.navigate(['/reset'], { queryParams: { cedula: this.cedula } });
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
    console.log('Volviendo atrás');
    this.router.navigate(['/answer-security-questions'], { queryParams: { cedula: this.cedula } });
  }

  resendCode(): void {
    // Lógica para reenviar el código de verificación
    alert('Se ha reenviado el código de verificación.');
  }
}