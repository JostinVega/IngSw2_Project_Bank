import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';

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
  nameExistsError: string = '';
  accountNumberExistsError: string = '';

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
    private accountService: AccountService,
    private http: HttpClient
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

  /*confirmBeneficiary(): void {
    if (this.isAccountNumberValid() && this.isBeneficiaryNameValid()) {
      this.accountService.verifyAccount(this.beneficiary.accountNumber).subscribe(
        response => {
          if (response.exists) {
            const tipoCuenta = response.cuenta.tipoCuenta;
            const contacto = {
              numero_identidad: this.numeroIdentidad,
              nombre: this.beneficiary.name,
              numeroCuenta: this.beneficiary.accountNumber,
              tipoCuenta: tipoCuenta,
              isFavorite: this.beneficiary.saveAsFavorite
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
  }*/

    confirmBeneficiary(): void {
      if (this.isAccountNumberValid() && this.isBeneficiaryNameValid()) {
          // Verificar si la cuenta existe en la base de datos de cuentas
          this.accountService.verifyAccount(this.beneficiary.accountNumber).subscribe(
              accountResponse => {
                  if (accountResponse.exists) {
                      // Verificar si el nombre completo ya existe en contactos
                      this.contactService.checkContactExistsByName(this.beneficiary.name).subscribe(
                          nameResponse => {
                              if (nameResponse.exists) {
                                  this.nameExistsError = 'El beneficiario ya está en su lista de contactos.';
                                  this.errorMessage = '';
                              } else {
                                  this.nameExistsError = ''; // Limpiar error de nombre si no existe
                                  // Verificar si el número de cuenta ya existe en contactos
                                  this.contactService.checkContactExistsByAccountNumber(this.beneficiary.accountNumber).subscribe(
                                      accountNumberResponse => {
                                          if (accountNumberResponse.exists) {
                                              this.accountNumberExistsError = 'El número de cuenta no corresponde a dicho beneficiario.';
                                              this.errorMessage = '';
                                          } else {
                                              this.accountNumberExistsError = ''; // Limpiar error de número de cuenta si no existe
                                              // Si todas las verificaciones son exitosas, agregar el beneficiario
                                              this.addBeneficiary();
                                          }
                                      },
                                      error => {
                                          if (error.status === 404) {
                                              this.accountNumberExistsError = ''; // Limpiar error de número de cuenta si no existe
                                              // Si la cuenta no está en contactos, agregar el beneficiario
                                              this.addBeneficiary();
                                          } else {
                                              console.error('Error al verificar el número de cuenta en contactos:', error);
                                              this.errorMessage = 'Error al verificar el número de cuenta en contactos. Por favor, intente de nuevo.';
                                          }
                                      }
                                  );
                              }
                          },
                          error => {
                              if (error.status === 404) {
                                  this.nameExistsError = ''; // Limpiar error de nombre si no existe
                                  // Verificar si el número de cuenta ya existe en contactos
                                  this.contactService.checkContactExistsByAccountNumber(this.beneficiary.accountNumber).subscribe(
                                      accountNumberResponse => {
                                          if (accountNumberResponse.exists) {
                                              this.accountNumberExistsError = 'El número de cuenta ya está en uso.';
                                              this.errorMessage = '';
                                          } else {
                                              this.accountNumberExistsError = ''; // Limpiar error de número de cuenta si no existe
                                              // Si todas las verificaciones son exitosas, agregar el beneficiario
                                              this.addBeneficiary();
                                          }
                                      },
                                      accountNumberError => {
                                          if (accountNumberError.status === 404) {
                                              this.accountNumberExistsError = ''; // Limpiar error de número de cuenta si no existe
                                              // Si la cuenta no está en contactos, agregar el beneficiario
                                              this.addBeneficiary();
                                          } else {
                                              console.error('Error al verificar el número de cuenta en contactos:', accountNumberError);
                                              this.errorMessage = 'Error al verificar el número de cuenta en contactos. Por favor, intente de nuevo.';
                                          }
                                      }
                                  );
                              } else {
                                  console.error('Error al verificar el nombre:', error);
                                  this.errorMessage = 'Error al verificar el nombre. Por favor, intente de nuevo.';
                              }
                          }
                      );
                  } else {
                      this.errorMessage = 'El número de cuenta ingresado no existe.';
                      this.successMessage = '';
                  }
              },
              error => {
                  console.error('Error al verificar la cuenta:', error);
                  this.errorMessage = 'La cuenta ingresada no existe.';
              }
          );
      } else {
          this.errorMessage = 'Ingrese un número de cuenta válido y un nombre válido.';
          this.successMessage = '';
      }
  }
  
  addBeneficiary(): void {
      const contacto = {
          numeroIdentidad: this.numeroIdentidad,
          nombre: this.beneficiary.name,
          //tipoCuenta: this.tipoCuenta,
          numeroCuenta: this.beneficiary.accountNumber,
          isFavorite: this.beneficiary.saveAsFavorite
      };
      console.log(contacto);
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
  }
  
  isAccountNumberValid(): boolean {
      return /^\d{10}$/.test(this.beneficiary.accountNumber);
  }
  
  isBeneficiaryNameValid(): boolean {
      return /^[a-zA-Z\s]+$/.test(this.beneficiary.name);
  }
  
      
  /*isAccountNumberValid(): boolean {
    return /^\d{10}$/.test(this.beneficiary.accountNumber);
  }

  isBeneficiaryNameValid(): boolean {
    return /^[a-zA-Z\s]+$/.test(this.beneficiary.name);
  }*/

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
