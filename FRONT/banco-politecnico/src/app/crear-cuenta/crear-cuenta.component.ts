import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../services/informacion-registro.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  accountSelectionForm: FormGroup;
  cuentaNumero: string | undefined;
  cuentaNombre: string | undefined;
  tipoCuenta: string | undefined;
  usuario: string = ''; // Placeholder value, replace with actual user data
  numeroIdentidad: string = ''; // Placeholder value, replace with actual identity number
  saldo: number = 0; // Placeholder value, replace with initial account balance

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.accountSelectionForm = this.fb.group({
      accountType: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      console.log('Received params:', params);
      console.log('Usuario:', this.usuario);
      console.log('Número de Identidad:', this.numeroIdentidad);
    });
  }

  onSubmit() {
    if (this.accountSelectionForm.valid) {
      const accountType = this.accountSelectionForm.value.accountType;
      this.generateAccount(accountType);

      const accountData = {
        numeroCuenta: this.cuentaNumero!,
        cuentaNombre: this.cuentaNombre!,
        tipoCuenta: this.tipoCuenta!,
        usuario: this.usuario,
        numero_identidad: this.numeroIdentidad,
        saldo: this.saldo
      };

      console.log('Datos antes de enviar al servidor:', accountData);

      this.registroService.setCuenta(accountData).subscribe((response: any) => {
        console.log('Cuenta creada con éxito:', response);

        this.router.navigate(['/confirmar-cuenta'], {
          queryParams: {
            usuario: this.usuario,
            numeroIdentidad: this.numeroIdentidad,
            tipoCuenta: this.tipoCuenta,
            cuentaNombre: this.cuentaNombre,
            cuentaNumero: this.cuentaNumero
          }
        });
      }, (error: any) => {
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
