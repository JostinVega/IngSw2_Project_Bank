import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';

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
  private apiUrl: string;

  //private apiUrl = 'https://bancopolitecnico-backend.vercel.app'; // Cambia esto si es necesario

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.apiUrl = environment.apiUrl;
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
  
      // Mostrar ventana emergente de confirmación
      const confirmationMessage = `Has elegido el tipo de cuenta: ${this.tipoCuenta}. ¿Desea continuar?`;
      if (window.confirm(confirmationMessage)) {
        this.http.post<any>(`${this.apiUrl}/nueva-cuenta`, accountData).subscribe(
          (response: any) => {
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
          },
          (error: any) => {
            console.error('Error al crear la cuenta:', error);
          }
        );
      }
    } else {
      // Mostrar ventana emergente si no se seleccionó un tipo de cuenta
      window.alert('Debe seleccionar un tipo de cuenta para continuar.');
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
      nombreCuenta = `CORRIENTE-${numeroCuenta.slice(-3)}`;
      tipoCuentaTexto = 'Corriente';
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

  goBack() {
    // Implementa la función para retroceder si es necesario
  }
}
