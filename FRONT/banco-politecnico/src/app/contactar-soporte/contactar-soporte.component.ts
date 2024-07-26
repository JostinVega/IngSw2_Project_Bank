
/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service'; // Asegúrate de importar el servicio correctamente



@Component({
  selector: 'app-contactar-soporte',
  templateUrl: './contactar-soporte.component.html',
  styleUrls: ['./contactar-soporte.component.css']
})
export class ContactarSoporteComponent {
  supportForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {
    this.supportForm = this.formBuilder.group({
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() { return this.supportForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.supportForm.invalid) {
      return;
    }

    // Send email
    this.emailService.sendEmail(this.f['subject'].value, this.f['description'].value)
      .subscribe(
        response => {
          const caseNumber = Math.floor(Math.random() * 1000000);
          this.successMessage = `Tu consulta se ha enviado con éxito. Número de caso: ${caseNumber}.`;
          this.supportForm.reset();
          this.submitted = false;
        },
        error => {
          console.error('Error al enviar el correo:', error);
          this.successMessage = 'Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo.';
        }
      );
  }
}*/
/*

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service'; // Asegúrate de importar el servicio correctamente
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service'; // Importa el servicio de usuario

@Component({
  selector: 'app-contactar-soporte',
  templateUrl: './contactar-soporte.component.html',
  styleUrls: ['./contactar-soporte.component.css']
})
export class ContactarSoporteComponent implements OnInit {
  supportForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  usuario: string | null = null;
  numeroIdentidad: string | null = null;
  correoElectronico: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private userService: UserService // Inyecta el servicio de usuario
  ) {
    this.supportForm = this.formBuilder.group({
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener los parámetros de consulta
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'] || null;
      this.numeroIdentidad = params['numeroIdentidad'] || null;
  
      // Obtener la información del usuario basada en numeroIdentidad
      if (this.numeroIdentidad) {
        this.userService.getUserByUsername(this.numeroIdentidad).subscribe(
          response => {
            this.correoElectronico = response.usuario?.correo_electronico || null;
            console.log('Correo electrónico del usuario:', this.correoElectronico); // Asegúrate de que se imprime el correo en la consola
          },
          error => {
            console.error('Error al obtener la información del usuario:', error);
          }
        );
      }
    });
  }
  

  get f() { return this.supportForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    // Stop if form is invalid
    if (this.supportForm.invalid) {
      return;
    }
  
    // Verifica que el correo del usuario se está enviando
    console.log('Enviando correo del usuario:', this.correoElectronico);
  
    // Send email
    this.emailService.sendEmail(this.f['subject'].value, this.f['description'].value, this.correoElectronico || '')
      .subscribe(
        response => {
          const caseNumber = Math.floor(Math.random() * 1000000);
          this.successMessage = `Tu consulta se ha enviado con éxito. Número de caso: ${caseNumber}.`;
          this.supportForm.reset();
          this.submitted = false;
        },
        error => {
          console.error('Error al enviar el correo:', error);
          this.successMessage = 'Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo.';
        }
      );
  }
  
  
  
  
  
  
  
}
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contactar-soporte',
  templateUrl: './contactar-soporte.component.html',
  styleUrls: ['./contactar-soporte.component.css']
})
export class ContactarSoporteComponent implements OnInit {
  supportForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  usuario: string | null = null;
  numeroIdentidad: string | null = null;
  correoElectronico: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private accountService: AccountService,
    private http: HttpClient
  ) {
    this.supportForm = this.formBuilder.group({
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'] || null;
      this.numeroIdentidad = params['numeroIdentidad'] || null;

      if (this.numeroIdentidad) {
        this.userService.getUserByUsername(this.numeroIdentidad).subscribe(
          response => {
            this.correoElectronico = response.usuario?.correo_electronico || null;
            console.log('Correo electrónico del usuario:', this.correoElectronico);
          },
          error => {
            console.error('Error al obtener la información del usuario:', error);
          }
        );
      }
    });
  }

  get f() { return this.supportForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.supportForm.invalid) {
      return;
    }

    console.log('Enviando correo del usuario:', this.correoElectronico);

    this.emailService.sendEmail(this.f['subject'].value, this.f['description'].value, this.correoElectronico || '')
      .subscribe(
        response => {
          const caseNumber = Math.floor(Math.random() * 1000000);
          this.successMessage = `Tu consulta se ha enviado con éxito. Número de caso: ${caseNumber}.`;
          this.supportForm.reset();
          this.submitted = false;
        },
        error => {
          console.error('Error al enviar el correo:', error);
          this.successMessage = 'Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo.';
        }
      );
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
            this.http.post('}https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber}).subscribe(
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
}
