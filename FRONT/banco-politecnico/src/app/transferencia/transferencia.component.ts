import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  amount: string = '';
  previousValidAmount: string = '';
  selectedAccount: string = '';
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  userAccounts: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      if (this.usuario) {
        this.fetchAccounts(this.usuario);
      } else {
        console.error('No usuario passed in queryParams');
      }
    });
  }

  fetchAccounts(usuario: string): void {
    this.accountService.getUserAccounts(usuario).subscribe(
      data => {
        console.log('Cuentas obtenidas:', data);
        this.userAccounts = data.cuentas;
        if (this.userAccounts.length > 0) {
          this.selectedAccount = this.userAccounts[0].numeroCuenta;
          this.numeroIdentidad = this.userAccounts[0].numeroIdentidad; // Guardar numeroIdentidad
        }
      },
      error => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  onAmountChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let input = inputElement.value;

    // Remove any non-numeric and non-period characters
    input = input.replace(/[^0-9.]/g, '');

    // Prevent more than one period
    if (input.split('.').length > 2) {
        input = input.substring(0, input.lastIndexOf('.'));
    }

    // Limit to two decimal places
    const decimalIndex = input.indexOf('.');
    if (decimalIndex !== -1 && input.length - decimalIndex - 1 > 2) {
        input = input.substring(0, decimalIndex + 3);
    }

    const value = parseFloat(input);

    if (/^\d*\.?\d{0,2}$/.test(input) && (value <= 15000 || input === '')) {
        this.amount = input;
    } else {
        if (value > 15000) {
            alert('El valor máximo a transferir es 15000.00');
        }
        input = this.amount;
    }

    // Update the input element value to sanitized input
    inputElement.value = input;
}

preventInvalidInput(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'];
    const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

    if (!allowedKeys.includes(event.key) && !numberKeys.includes(event.key)) {
        event.preventDefault();
    }

    const inputElement = event.target as HTMLInputElement;
    if (event.key === '.' && inputElement.value.includes('.')) {
        event.preventDefault();
    }

    // Prevent entering more than two decimal places
    const decimalIndex = inputElement.value.indexOf('.');
    if (decimalIndex !== -1 && inputElement.selectionStart !== null) {
        const cursorPosition = inputElement.selectionStart;
        if (cursorPosition > decimalIndex && inputElement.value.length - decimalIndex > 2) {
            event.preventDefault();
        }
    }
}

  formatAmount(): void {
    let value = parseFloat(this.amount);
    if (isNaN(value) || value < 1 || value > 15000) {
      if (value > 15000) {
        alert('El valor máximo a transferir es 15000.00');
      }
      this.amount = this.previousValidAmount;
    } else {
      this.amount = value.toFixed(2);
      this.previousValidAmount = this.amount;
    }

    if (this.amount.indexOf('.') !== -1) {
      const parts = this.amount.split('.');
      if (parts[1].length === 1) {
        this.amount = `${parts[0]}.${parts[1]}0`;
      }
    }
  }

  onAccountChange(event: Event): void {
    this.selectedAccount = (event.target as HTMLSelectElement).value;
    console.log('Cuenta seleccionada:', this.selectedAccount);
    const selectedAccount = this.userAccounts.find(account => account.numeroCuenta === this.selectedAccount);
    if (selectedAccount) {
      this.numeroIdentidad = selectedAccount.numeroIdentidad; // Actualizar numeroIdentidad cuando cambie la cuenta seleccionada
    }
  }

  /*chooseBeneficiary(): void {
    const selectedAccount = this.userAccounts.find(account => account.numeroCuenta === this.selectedAccount);
    if (selectedAccount) {
      const selectedAmount = parseFloat(this.amount);
      if (selectedAmount > parseFloat(selectedAccount.saldo)) {
        this.errorMessage = 'El monto de la transferencia no puede ser mayor que el saldo de la cuenta.';
      } else if (selectedAmount == 0) {
        this.errorMessage = 'El monto de la transferencia no puede ser cero.';
      } else {
        this.router.navigate(['/beneficiario'], {
          queryParams: {
            cuentaNombre: selectedAccount.cuentaNombre,
            numeroCuenta: selectedAccount.numeroCuenta,
            tipoCuenta: selectedAccount.tipoCuenta,
            saldo: selectedAccount.saldo,
            amount: this.amount,
            usuario: this.usuario,
            numeroIdentidad: this.numeroIdentidad
          }
        });
      }
    } else {
      this.errorMessage = 'Seleccione una cuenta válida y un monto válido.';
    }
  }*/

    chooseBeneficiary(): void {
      if (!this.amount || parseFloat(this.amount) <= 0) {
          alert('Debe ingresar un monto para continuar.');
          return;
      }
  
      const selectedAccount = this.userAccounts.find(account => account.numeroCuenta === this.selectedAccount);
      if (selectedAccount) {
          const selectedAmount = parseFloat(this.amount);
          if (selectedAmount > parseFloat(selectedAccount.saldo)) {
              this.errorMessage = 'El monto de la transferencia no puede ser mayor que el saldo de la cuenta.';
          } else {
              this.router.navigate(['/beneficiario'], {
                  queryParams: {
                      cuentaNombre: selectedAccount.cuentaNombre,
                      numeroCuenta: selectedAccount.numeroCuenta,
                      tipoCuenta: selectedAccount.tipoCuenta,
                      saldo: selectedAccount.saldo,
                      amount: this.amount,
                      usuario: this.usuario,
                      numeroIdentidad: this.numeroIdentidad
                  }
              });
          }
      } else {
          this.errorMessage = 'Seleccione una cuenta válida.';
      }
  }
  

  navigateToTransfer(): void {
    this.router.navigate(['/transferencia'], { queryParams: { usuario: this.usuario } });
  }

  navigateToNewAccount(): void {
    const numeroIdentidad = this.numeroIdentidad;
    if (numeroIdentidad) {
      this.accountService.getUserInfo(numeroIdentidad).subscribe(
        userInfo => {
          const email = userInfo.correo_electronico;
          const phoneNumber = userInfo.numero_telefono;
          //if (email && phoneNumber) {
            //this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
          if (email && phoneNumber) {
            this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber}).subscribe(
              (response: any) => {
                console.log('Código de seguridad enviado:', response);
                this.router.navigate(['/verificar-crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad, email, phoneNumber} });
              },
              (error) => {
                console.error('Error al enviar el código de verificación:', error);
              }
            );
          } else {
            console.error('Email o número de teléfono no disponible');
          }
        },
        error => {
          console.error('Error fetching user info:', error);
        }
      );
    } else {
      console.error('Número de Identidad no disponible');
    }
  }

    /*navigateToNewAccount(): void {
      const numeroIdentidad = this.numeroIdentidad;
      if (numeroIdentidad) {
        this.accountService.getUserInfo(numeroIdentidad).subscribe(
          userInfo => {
            const email = userInfo.correo_electronico;
            const phoneNumber = userInfo.numero_telefono;
            if (email && phoneNumber) {
              // Primer envío del código de verificación
              this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
                (response: any) => {
                  console.log('Primer código de seguridad enviado:', response);
    
                  // Reenvío automático del código de verificación
                  this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
                    (secondResponse: any) => {
                      console.log('Segundo código de seguridad enviado:', secondResponse);
                      this.router.navigate(['/verificar-crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad, email, phoneNumber } });
                    },
                    (error) => {
                      console.error('Error al reenviar el código de verificación:', error);
                    }
                  );
                },
                (error) => {
                  console.error('Error al enviar el primer código de verificación:', error);
                }
              );
            } else {
              console.error('Email o número de teléfono no disponible');
            }
          },
          error => {
            console.error('Error fetching user info:', error);
          }
        );
      } else {
        console.error('Número de Identidad no disponible');
      }
    }*/
    

  navigateToVerUsuario(): void {
    this.router.navigate(['/ver-perfil'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToActualizarInformacion(): void {
    const numeroIdentidad = this.numeroIdentidad;
    console.log(numeroIdentidad);
    if (numeroIdentidad) {
      this.router.navigate(['/actualizar-informacion'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  navigateToFAQ(): void {
    this.router.navigate(['/faq'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToContactarSoporte(): void {
    this.router.navigate(['/contactar-soporte'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToInicio(): void {
    this.router.navigate(['/inicio'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToChangePassword(): void {
    const numeroIdentidad = this.numeroIdentidad;
    if (numeroIdentidad) {
      this.router.navigate(['/change-password'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  navigateToHistorialTransacciones(): void {
    const numeroIdentidad = this.numeroIdentidad;
    if (this.usuario && numeroIdentidad) {
      console.log('Navegando a historial-transacciones con:', {
        usuario: this.usuario,
        numeroIdentidad: numeroIdentidad
      });
      this.router.navigate(['/historial-transacciones'], {
        queryParams: {
          usuario: this.usuario,
          numeroIdentidad: numeroIdentidad
        }
      });
    } else {
      console.error('Usuario o Numero de Identidad no disponible');
    }
  }

  navigateToAddContact(): void{
    const numeroIdentidad = this.numeroIdentidad;
    if (numeroIdentidad) {
      this.router.navigate(['/crear-contactos'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  goBack(): void {
    console.log('Volver a la página anterior');
  }

}
