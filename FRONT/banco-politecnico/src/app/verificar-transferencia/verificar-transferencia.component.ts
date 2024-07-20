/*import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CodigoService } from '../services/codigo.service';

@Component({
  selector: 'app-verificar-transferencia',
  templateUrl: './verificar-transferencia.component.html',
  styleUrls: ['./verificar-transferencia.component.css']
})
export class VerificarTransferenciaComponent {

  numero_identidad = ""; //Obtener el ID 
  digits: string[] = ['', '', '', '', ''];
  enteredCode: string = '';
  message: string = '';

  constructor(private http: HttpClient, private codigoService: CodigoService) { }

  ngOnInit(){
    this.sendCode();
  }

  sendCode() {
    this.codigoService.sendSecurityCode(this.numero_identidad).subscribe(
      (response: any) => {
        this.message = response.message;
      },
      (error: any) => {
        this.message = error.error.message;
      }
    );
  }

  onSubmit(): void {
    this.codigoService.verifySecurityCode(this.numero_identidad, this.enteredCode).subscribe(
      (response: any) => {
        this.message = response.message;
      },
      (error: any) => {
        this.message = error.error.message;
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
    // Lógica para regresar (volver atrás)
    console.log('Volviendo atrás');
    // Aquí podrías agregar más lógica según lo que necesites para regresar
  }

  resendCode(): void {
    this.codigoService.sendSecurityCode(this.numero_identidad).subscribe(
      (response: any) => {
        this.message = response.message;
      },
      (error: any) => {
        this.message = error.error.message;
      }
    );

  }
}

*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CodigoService } from '../services/codigo.service';

@Component({
  selector: 'app-verificar-transferencia',
  templateUrl: './verificar-transferencia.component.html',
  styleUrls: ['./verificar-transferencia.component.css']
})
export class VerificarTransferenciaComponent implements OnInit {
  cuentaNombre: string | undefined;
  numeroCuenta: string | undefined;
  tipoCuenta: string | undefined;
  saldo: number | undefined;
  amount: number | undefined;
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  contactName: string | undefined;
  contactNumber: string | undefined;
  comment: string | undefined;

  digits: string[] = ['', '', '', '', ''];
  enteredCode: string = '';
  message: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private codigoService: CodigoService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'];
      this.numeroCuenta = params['numeroCuenta'];
      this.tipoCuenta = params['tipoCuenta'];
      this.saldo = parseFloat(params['saldo']);
      this.amount = parseFloat(params['amount']);
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.contactName = params['contactName'];
      this.contactNumber = params['contactNumber'];
      this.comment = params['comment'];
    });
    this.sendCode();
  }

  sendCode() {
    this.enteredCode = this.digits.join('');
    if (this.numeroIdentidad) {
      console.log(this.numeroIdentidad);
      this.codigoService.sendSecurityCode(this.numeroIdentidad).subscribe(
        (response: any) => {
          this.message = response.message;
        },
        (error: any) => {
          this.message = error.error.message;
        }
      );
    } else {
      this.message = 'Número de identidad no definido.';
    }
  }

  onSubmit(): void {
    if (this.numeroIdentidad) {
      this.codigoService.verifySecurityCode(this.numeroIdentidad, this.enteredCode).subscribe(
        (response: any) => {
          this.message = response.message;
        },
        (error: any) => {
          this.message = error.error.message;
        }
      );
    } else {
      this.message = 'Número de identidad no definido.';
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
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['/confirmar-transferencia'], { queryParams: params });
    });
  }

  resendCode(): void {
    if (this.numeroIdentidad) {
      this.codigoService.sendSecurityCode(this.numeroIdentidad).subscribe(
        (response: any) => {
          this.message = response.message;
        },
        (error: any) => {
          this.message = error.error.message;
        }
      );
    } else {
      this.message = 'Número de identidad no definido.';
    }
  }
}


