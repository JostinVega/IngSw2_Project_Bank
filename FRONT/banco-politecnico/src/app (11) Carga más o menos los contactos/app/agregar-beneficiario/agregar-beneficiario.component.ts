import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-agregar-beneficiario',
  templateUrl: './agregar-beneficiario.component.html',
  styleUrls: ['./agregar-beneficiario.component.css']
})
export class AgregarBeneficiarioComponent implements OnInit {
  beneficiary = {
    name: '',
    accountNumber: '',
    saveToContacts: false,
    saveAsFavorite: false
  };

  errorMessage: string = '';
  successMessage: string = '';

  cuentaNombre: string | undefined;
  numeroCuenta: string | undefined;
  tipoCuenta: string | undefined;
  saldo: number | undefined;
  amount: number | undefined;
  usuario: string | undefined;
  numeroIdentidad: string | undefined;

  constructor(
    private router: Router,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'];
      this.numeroCuenta = params['numeroCuenta'];
      this.tipoCuenta = params['tipoCuenta'];
      this.saldo = params['saldo'];
      this.amount = params['amount'];
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
    });
  }

  confirmBeneficiary(): void {
    if (this.isAccountNumberValid() && this.isBeneficiaryNameValid()) {
      this.accountService.verifyAccount(this.beneficiary.accountNumber).subscribe(
        accountExists => {
          if (accountExists) {
            const contacto = {
              numero_identidad: this.numeroIdentidad,
              nombre_completo: this.beneficiary.name,
              numero_cuenta: this.beneficiary.accountNumber
            };
            this.contactService.addContact(contacto).subscribe(
              response => {
                this.successMessage = 'Beneficiario agregado con éxito.';
                this.errorMessage = '';
                // Redirigir a la interfaz de beneficiario después de 2 segundos
                setTimeout(() => {
                  this.router.navigate(['/beneficiario'], {
                    queryParams: {
                      cuentaNombre: this.cuentaNombre,
                      numeroCuenta: this.numeroCuenta,
                      tipoCuenta: this.tipoCuenta,
                      saldo: this.saldo,
                      amount: this.amount,
                      usuario: this.usuario,
                      numeroIdentidad: this.numeroIdentidad
                    }
                  });
                }, 2000); // Puedes ajustar el tiempo de espera según sea necesario
              },
              err => {
                console.error('Error al agregar beneficiario:', err);
                this.errorMessage = 'Error al agregar beneficiario. Por favor, intente de nuevo.';
                this.successMessage = '';
              }
            );
          } else {
            this.errorMessage = 'El número de cuenta ingresado no existe.';
            this.successMessage = '';
          }
        },
        error => {
          console.error('Error al verificar la cuenta:', error);
          this.errorMessage = 'Error al verificar la cuenta. Por favor, intente de nuevo.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Ingrese un número de cuenta válido y un nombre válido.';
      this.successMessage = '';
    }
  }

  isAccountNumberValid(): boolean {
    return /^\d{10}$/.test(this.beneficiary.accountNumber);
  }

  isBeneficiaryNameValid(): boolean {
    return /^[a-zA-Z\s]+$/.test(this.beneficiary.name);
  }

  goToBeneficiario(): void {
    this.router.navigate(['/beneficiario'], {
      queryParams: {
        cuentaNombre: this.cuentaNombre,
        numeroCuenta: this.numeroCuenta,
        tipoCuenta: this.tipoCuenta,
        saldo: this.saldo,
        amount: this.amount,
        usuario: this.usuario,
        numeroIdentidad: this.numeroIdentidad
      }
    });
  }

  goNext(): void {
    console.log('Ir a la siguiente pantalla');
  }

  goBack(): void {
    this.router.navigate(['/beneficiario'], {
      queryParams: {
        cuentaNombre: this.cuentaNombre,
        numeroCuenta: this.numeroCuenta,
        tipoCuenta: this.tipoCuenta,
        saldo: this.saldo,
        amount: this.amount,
        usuario: this.usuario,
        numeroIdentidad: this.numeroIdentidad
      }
    });
  }

  onAccountNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').substring(0, 10);
    this.beneficiary.accountNumber = input.value;
  }

  onNameChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
    this.beneficiary.name = input.value;
  }
}
