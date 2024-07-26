import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { RegistroService } from '../services/informacion-registro.service';

@Component({
  selector: 'app-tipo-cuenta',
  templateUrl: './tipo-cuenta.component.html',
  styleUrls: ['./tipo-cuenta.component.css']
})
export class TipoCuentaComponent {
  accountSelectionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registroService: RegistroService // Inyectar el servicio
  ) {
    this.accountSelectionForm = this.fb.group({
      accountType: ['', Validators.required],
      numeroCuenta: [''],
      cuentaNombre: [''],
      tipoCuenta: [''],
      saldo: ['']
    });
  }

  generateAccount(accountType: string) {
    let numeroCuenta = '';
    let cuentaNombre = '';
    let tipoCuentaTexto = '';
    let saldo = '';

    if (accountType === 'savings') {
      numeroCuenta = this.generateUniqueAccountNumber('2');
      cuentaNombre = `AHORRO-${numeroCuenta.slice(-3)}`;
      tipoCuentaTexto = 'Ahorro';
      saldo = '0';
    } else if (accountType === 'current') {
      numeroCuenta = this.generateUniqueAccountNumber('5');
      cuentaNombre = `CORRIENTE-${numeroCuenta.slice(-3)}`;
      tipoCuentaTexto = 'Corriente';
      saldo = '0';
    }

    this.accountSelectionForm.patchValue({
      numeroCuenta: numeroCuenta,
      cuentaNombre: cuentaNombre,
      tipoCuenta: tipoCuentaTexto,
      saldo: saldo
    });

    console.log('Número de cuenta:', numeroCuenta);
    console.log('Nombre de cuenta:', cuentaNombre);
    console.log('Tipo de cuenta:', tipoCuentaTexto);
    console.log('Saldo', saldo );
  }

  onSubmit() {
    console.log('onSubmit llamado'); // Agregar un mensaje de consola al inicio
    if (this.accountSelectionForm.invalid) {
      console.log('Formulario inválido:', this.accountSelectionForm); // Mostrar el estado del formulario
      this.accountSelectionForm.markAllAsTouched();
      alert('Debe seleccionar un tipo de cuenta para continuar.');
      return;
    }
  
    const accountType = this.accountSelectionForm.value.accountType;
    this.generateAccount(accountType);
  
    const accountTypeText = accountType === 'savings' ? 'una cuenta de ahorro' : 'una cuenta corriente';
    if (confirm(`Has escogido ${accountTypeText}. ¿Deseas continuar?`)) {
      this.registroService.setRegistrationData('step5', this.accountSelectionForm.value);
      this.router.navigateByUrl('/confirmar-registro');
    }
  }

  goBack() {
    // Implementa la función para retroceder si es necesario
  }

  generateUniqueAccountNumber(startsWith: string): string {
    let newAccountNumber;
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
    return true;
  }

  // Método en el componente para verificar la validez del control
  isAccountTypeInvalid() {
    const control = this.accountSelectionForm.get('accountType');
    return control?.invalid && (control.dirty || control.touched);
  }
}

