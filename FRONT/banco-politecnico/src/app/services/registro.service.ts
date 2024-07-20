import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../services/informacion-registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {
  accountSelectionForm: FormGroup;
  cuentaNumero: string | undefined;
  cuentaNombre: string | undefined;
  tipoCuenta: string | undefined;
  usuario: string = 'defaultUser'; // Placeholder value, replace with actual user data
  numeroIdentidad: string = 'defaultID'; // Placeholder value, replace with actual identity number
  saldo: number = 0; // Placeholder value, replace with initial account balance

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router
  ) {
    this.accountSelectionForm = this.fb.group({
      accountType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.accountSelectionForm.valid) {
      const accountType = this.accountSelectionForm.value.accountType;
      this.generateAccount(accountType);
      this.registroService.setCuenta(
        this.cuentaNumero!,
        this.cuentaNombre!,
        accountType,
        this.usuario,
        this.numeroIdentidad,
        this.saldo
      ).subscribe(response => {
        console.log('Cuenta creada con éxito:', response);
        this.router.navigateByUrl('/confirmar-cuenta');
      }, error => {
        console.error('Error al crear la cuenta:', error);
      });
    } else {
      // Manejar el caso de que el formulario no sea válido
    }
  }

  generateAccount(accountType: string) {
    let numeroCuenta: string = '';
    let nombreCuenta: string = '';
    let tipoCuentaTexto: string = '';

    if (accountType === 'savings') {
      numeroCuenta = this.generateUniqueAccountNumber('2');
      nombreCuenta = `AHORRO-${numeroCuenta.slice(-3)}`;
      tipoCuentaTexto = 'Ahorro';
    } else if (accountType === 'current') {
      numeroCuenta = this.generateUniqueAccountNumber('5');
      nombreCuenta = `CREDITO-${numeroCuenta.slice(-3)}`;
      tipoCuentaTexto = 'Crédito';
    }

    this.cuentaNumero = numeroCuenta;
    this.cuentaNombre = nombreCuenta;
    this.tipoCuenta = tipoCuentaTexto;

    console.log('Número de cuenta:', this.cuentaNumero);
    console.log('Nombre de cuenta:', this.cuentaNombre);
    console.log('Tipo de cuenta:', this.tipoCuenta);
  }

  generateUniqueAccountNumber(startsWith: string): string {
    let newAccountNumber: string;
    do {
      newAccountNumber = startsWith + this.generateRandomNumberString(9);
    } while (!this.isAccountNumberUnique(newAccountNumber));
    return newAccountNumber;
  }

  generateRandomNumberString(length: number): string {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  isAccountNumberUnique(accountNumber: string): boolean {
    // Aquí iría la lógica para verificar si el número de cuenta es único en tu sistema
    // Por ahora, asumimos que todos los números generados son únicos
    return true;
  }

  goBack() {
    // Implementa la función para retroceder si es necesario
  }
}
