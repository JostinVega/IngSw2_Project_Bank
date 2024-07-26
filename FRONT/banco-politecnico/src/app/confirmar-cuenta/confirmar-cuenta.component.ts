import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarCuentaService } from '../services/confirmar-cuenta.service';
import { ContactService } from '../services/contact.service';
import { UsuarioDataCrearCuentaService } from '../services/usuario-data-crear-cuenta.service';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-confirmar-cuenta',
  templateUrl: './confirmar-cuenta.component.html',
  styleUrls: ['./confirmar-cuenta.component.css']
})
export class ConfirmarCuentaComponent implements OnInit {
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  tipoCuenta: string | undefined;
  cuentaNombre: string | undefined;
  cuentaNumero: string | undefined;
  email: string = ''; 
  phoneNumber: string = '';

  private apiUrl = 'https://bancopolitecnico-backend.vercel.app'; // NOTIFICACIONES

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private registroService: ConfirmarCuentaService,
    private usuarioDataCrearCuentaService: UsuarioDataCrearCuentaService,
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  //SMS Y CORREO
  /*
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.tipoCuenta = params['tipoCuenta'];
      this.cuentaNombre = params['cuentaNombre'];
      this.cuentaNumero = params['cuentaNumero'];
      console.log('Received params in ConfirmarCuentaComponent:', params);

       // Obtener los datos del usuario desde el servicio compartido
      const usuarioData = this.usuarioDataCrearCuentaService.getUsuarioData();
      this.email = usuarioData.correo_electronico;
      this.phoneNumber = usuarioData.numero_telefono;

      // Llamar al servicio para almacenar los datos en la base de datos
      const accountData = {
        numeroCuenta: this.cuentaNumero,
        cuentaNombre: this.cuentaNombre,
        tipoCuenta: this.tipoCuenta,
        numeroIdentidad: this.numeroIdentidad,
        saldo: '0' // Asumiendo que el saldo inicial es 0, ajustar según sea necesario
      };

      const contacto = {
        numero_identidad: this.numeroIdentidad,
        nombre: this.cuentaNombre,
        numeroCuenta: this.cuentaNumero,
        isFavorite: true
      }

      this.registroService.crearCuenta(accountData).subscribe(response => {
        console.log('Datos almacenados en la base de datos:', response);
        alert('Cuenta creada exitosamente.');

        // Enviar confirmación por correo electrónico y SMS
        if (this.email && this.phoneNumber) {
          this.enviarConfirmacion(this.email, this.phoneNumber);
        } else {
          console.error('Datos del usuario incompletos');
        }
      }, error => {
        console.error('Error al almacenar los datos en la base de datos:', error);
      });

      this.contactService.addContact(contacto).subscribe(response => {
        console.log('Cuenta agregada como beneficiario:', response);
        //alert('Cuenta creada exitosamente.');
      }, error => {
        console.error('Error al almacenar el beneficiario:', error);
      });

    });
  }

  enviarConfirmacion(email: string, phoneNumber: string): void {
    const subject = 'Confirmación de Creación de Cuenta - Banco Politécnico';
    const message = 'Su cuenta ha sido creada con exito.';
    const payload = { email, phoneNumber, subject, message };
    console.log('Payload enviado:', payload); // Log para verificar el payload
      
    // Enviar confirmación por correo electrónico y SMS
    this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
      (confirmResponse: any) => {
        console.log('Confirmación enviada:', confirmResponse);
      },
      (confirmError: any) => {
        console.error('Error al enviar confirmación:', confirmError);
      }
    );
  }
  
  */

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.tipoCuenta = params['tipoCuenta'];
      this.cuentaNombre = params['cuentaNombre'];
      this.cuentaNumero = params['cuentaNumero'];
      console.log('Received params in ConfirmarCuentaComponent:', params);

       // Obtener los datos del usuario desde el servicio compartido
       const usuarioData = this.usuarioDataCrearCuentaService.getUsuarioData();
       this.email = usuarioData.correo_electronico;
       this.phoneNumber = usuarioData.numero_telefono;

      // Llamar al servicio para almacenar los datos en la base de datos
      const accountData = {
        numeroCuenta: this.cuentaNumero,
        cuentaNombre: this.cuentaNombre,
        tipoCuenta: this.tipoCuenta,
        numeroIdentidad: this.numeroIdentidad,
        saldo: '0' // Asumiendo que el saldo inicial es 0, ajustar según sea necesario
      };

      const contacto = {
        numero_identidad: this.numeroIdentidad,
        nombre: this.cuentaNombre,
        numeroCuenta: this.cuentaNumero,
        isFavorite: true
      }

      this.registroService.crearCuenta(accountData).subscribe(response => {
        console.log('Datos almacenados en la base de datos:', response);
        alert('Cuenta creada exitosamente.');

        // Enviar confirmación por correo electrónico y SMS
        if (this.email) {
          this.enviarConfirmacion(this.email);
          //this.enviarConfirmacion(this.email);
        } else {
          console.error('Datos del usuario incompletos');
        }

      }, error => {
        console.error('Error al almacenar los datos en la base de datos:', error);
      });

      this.contactService.addContact(contacto).subscribe(response => {
        console.log('Cuenta agregada como beneficiario:', response);
        //alert('Cuenta creada exitosamente.');
      }, error => {
        console.error('Error al almacenar el beneficiario:', error);
      });

      
    });
  }

  enviarConfirmacion(email: string): void {
    const subject = 'Confirmación de Creación de Cuenta - Banco Politécnico';
    const message = 'Su cuenta ha sido creada con exito.';
    const payload = { email, subject, message };
    console.log('Payload enviado:', payload); // Log para verificar el payload
      
    // Enviar confirmación por correo electrónico y SMS
    this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
      (confirmResponse: any) => {
        console.log('Confirmación enviada:', confirmResponse);
      },
      (confirmError: any) => {
        console.error('Error al enviar confirmación:', confirmError);
      }
    );
  }

  confirmar() {
    if (this.usuario) {
      console.log('Navegando a inicio con usuario:', this.usuario);
      this.router.navigate(['/inicio'], {
        queryParams: { usuario: this.usuario }
      });
    } else {
      console.error('No usuario to pass in queryParams');
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
    // Lógica para regresar a la pantalla anterior
    window.history.back();
  }
}
