import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioDataService } from '../services/usuario-data.service';
import { BloqueoService } from '../services/bloqueo.service';

@Component({
  selector: 'app-answer-security-questions',
  templateUrl: './answer-security-questions.component.html',
  styleUrls: ['./answer-security-questions.component.css']
})
export class AnswerSecurityQuestionsComponent implements OnInit {
  cedula: string = '';
  usuario: any;
  questions: string[] = [];
  answers: string[] = [];
  correctAnswers: string[] = [];
  selectedQuestionIndex: number | null = null;
  answer: string = '';
  attempts: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private usuarioDataService: UsuarioDataService,
    private http: HttpClient,
    private bloqueoService: BloqueoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cedula = params['cedula'];
      this.obtenerUsuarioConLabels();
    });
  }

  /*
  obtenerUsuarioConLabels() {
    console.log('Solicitando usuario con cédula:', this.cedula);
    this.usuarioService.getUsuarioWithLabels(this.cedula).subscribe(
      response => {
        console.log('Usuario con labels:', response);
        this.usuario = response;
        this.questions = response.labels || [];
        //this.answers = new Array(this.questions.length).fill('');
        this.correctAnswers = [
          response.answer1,
          response.answer2,
          response.answer3,
          response.answer4,
          response.answer5
        ];
      },
      error => {
        console.error('Error al obtener el usuario con labels:', error);
        this.questions = [];
        //this.answers = [];
        this.correctAnswers = [];
      }
    );
  }
  */
  
  obtenerUsuarioConLabels() {
    console.log('Solicitando usuario con cédula:', this.cedula);
    this.usuarioService.getUsuarioWithLabels(this.cedula).subscribe(
      response => {
        console.log('Usuario con labels:', response);
        this.usuario = {
          email: response.correo_electronico,
          phoneNumber: response.numero_telefono,
          ...response
        };
        console.log('Usuario asignado:', this.usuario); // Añadir log para verificar la asignación del usuario
        
        this.usuarioDataService.setUsuarioData(this.usuario);
        
        this.questions = response.labels || [];
        this.correctAnswers = [
          response.answer1,
          response.answer2,
          response.answer3,
          response.answer4,
          response.answer5
        ];
      },
      error => {
        console.error('Error al obtener el usuario con labels:', error);
        this.questions = [];
        this.correctAnswers = [];
      }
    );
  }
  

  goBack() {
    this.router.navigate(['/previous-route']);
  }

  /*
  validateAnswer() {
    if (this.selectedQuestionIndex === null || !this.answer.trim()) {
      alert('Debe seleccionar una pregunta y proporcionar una respuesta');
      return;
    }

    if (this.answer === this.correctAnswers[this.selectedQuestionIndex]) {
      console.log('Respuesta correcta');
      //this.router.navigate(['/verify-identity'], { queryParams: { cedula: this.cedula } });
      const email = this.usuario.email;
      const phoneNumber = this.usuario.phoneNumber;
      const request = { email, phoneNumber };
      
      this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', request).subscribe(
        (response: any) => {
          console.log('Código de seguridad enviado:', response);
          this.router.navigate(['/verify-identity'], { queryParams: { cedula: this.cedula } });
        },
        (error) => {
          console.error('Error al enviar el código de seguridad:', error);
        }
      );
    } else {
      this.attempts++;
      if (this.attempts >= 3) {
        alert('Cuenta bloqueada por demasiados intentos fallidos.');
        this.bloquearCuenta();
      } else {
        alert('Respuesta incorrecta. Intente nuevamente.');
        this.selectedQuestionIndex = null;
        this.answer = '';
      }
    }
  }
  */

  validateAnswer() {
    if (this.selectedQuestionIndex === null || !this.answer.trim()) {
      alert('Debe seleccionar una pregunta y proporcionar una respuesta');
      return;
    }

    if (this.answer === this.correctAnswers[this.selectedQuestionIndex]) {
      console.log('Respuesta correcta');
      //this.router.navigate(['/verify-identity'], { queryParams: { cedula: this.cedula } });
      const email = this.usuario.email;
      console.log('Email:', email); // Añadir log para verificar email
      
      const phoneNumber = this.usuario.phoneNumber;
      console.log('PhoneNumber:', phoneNumber);
      const request = { email, phoneNumber };
      console.log('Request Data:', request); // Añadir log para verificar los datos de la solicitud
      this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', request).subscribe(
        (response: any) => {
          console.log('Código de seguridad enviado:', response);
          localStorage.setItem('email', email);
          this.router.navigate(['/verify-identity'], { queryParams: { cedula: this.cedula } });
        },
        (error) => {
          console.error('Error al enviar el código de seguridad:', error);
        }
      );
    } else {
      this.attempts++;
      if (this.attempts >= 3) {
        this.enviarNotificacionBloqueo();
        alert('Cuenta bloqueada por demasiados intentos fallidos.');
        this.bloquearCuenta();
      } else {
        alert('Respuesta incorrecta. Intente nuevamente.');
        this.selectedQuestionIndex = null;
        this.answer = '';
      }
    }
  }

    /*validateAnswer() {
      if (this.selectedQuestionIndex === null || !this.answer.trim()) {
        alert('Debe seleccionar una pregunta y proporcionar una respuesta');
        return;
      }
    
      if (this.answer === this.correctAnswers[this.selectedQuestionIndex]) {
        console.log('Respuesta correcta');
    
        const email = this.usuario.email;
        console.log('Email:', email);
        
        const phoneNumber = this.usuario.phoneNumber;
        console.log('PhoneNumber:', phoneNumber);
        
        const request = { email, phoneNumber };
        console.log('Request Data:', request);
    
        // Primer envío del código de seguridad
        this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', request).subscribe(
          (response: any) => {
            console.log('Primer código de seguridad enviado:', response);
    
            // Reenvío automático del código de seguridad
            this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', request).subscribe(
              (secondResponse: any) => {
                console.log('Segundo código de seguridad enviado:', secondResponse);
                localStorage.setItem('email', email);
                this.router.navigate(['/verify-identity'], { queryParams: { cedula: this.cedula } });
              },
              (error) => {
                console.error('Error al reenviar el código de seguridad:', error);
              }
            );
          },
          (error) => {
            console.error('Error al enviar el primer código de seguridad:', error);
          }
        );
      } else {
        this.attempts++;
        if (this.attempts >= 3) {
          this.enviarNotificacionBloqueo();
          this.enviarNotificacionBloqueo();
          alert('Cuenta bloqueada por demasiados intentos fallidos.');
          this.bloquearCuenta();
        } else {
          alert('Respuesta incorrecta. Intente nuevamente.');
          this.selectedQuestionIndex = null;
          this.answer = '';
        }
      }
    }*/
    

  //SMS Y CORREO
  
  enviarNotificacionBloqueo(): void {
    const email = this.usuario.email;
    console.log('Email:', email); // Añadir log para verificar email
      
    const phoneNumber = this.usuario.phoneNumber;
    console.log('PhoneNumber:', phoneNumber);

    console.log('Intentando enviar notificación de bloqueo...');
    if (email && phoneNumber) {
      const subject = 'Intento de recuperación de contraseña';
      const message = 'Se ha detectado un intento de recuperacion de clave para su cuenta. Si usted no realizo esta solicitud, por favor contacte a soporte tecnico para asegurar la seguridad de su cuenta.';
      console.log('Datos de notificación:', { email: email, phoneNumber: phoneNumber, subject, message });

      this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: email,
        phoneNumber: phoneNumber,
        subject,
        message
      }).subscribe(
        (response: any) => {
          console.log('Notificación de bloqueo enviada:', response);
        },
        (error) => {
          console.error('Error al enviar la notificación de bloqueo:', error);
        }
      );
    } else {
      console.error('No se pudo enviar la notificación de bloqueo. Información de contacto no disponible.');
    }
  }
  

  //SOLO CORREO
  /*enviarNotificacionBloqueo(): void {
    const email = this.usuario.email;
    console.log('Email:', email); // Añadir log para verificar email
      
    const phoneNumber = this.usuario.phoneNumber;
    console.log('PhoneNumber:', phoneNumber);
    console.log('Intentando enviar notificación de bloqueo...');
    if (email) {
      const subject = 'Intento de recuperación de contraseña';
      const message = 'Se ha detectado un intento de recuperacion de clave para su cuenta. Si usted no realizo esta solicitud, por favor contacte a soporte tecnico para asegurar la seguridad de su cuenta.';
      console.log('Datos de notificación:', { email: email, subject, message });

      this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: email,
        //phoneNumber: this.phoneNumber,
        subject,
        message
      }).subscribe(
        (response: any) => {
          console.log('Notificación de bloqueo enviada:', response);
        },
        (error) => {
          console.error('Error al enviar la notificación de bloqueo:', error);
        }
      );
    } else {
      console.error('No se pudo enviar la notificación de bloqueo. Información de contacto no disponible.');
    }
  }*/

  bloquearCuenta() {
    if (this.cedula) {
      this.bloqueoService.bloquearUsuarioNumeroIdentidad(this.cedula).subscribe(
        response => {
          console.log('Cuenta bloqueada:', response);
          alert('Su cuenta ha sido bloqueada debido a múltiples intentos fallidos. Contacte a soporte para más ayuda.');
          this.router.navigate(['/home']); // Redireccionar a la página de inicio
        },
        error => {
          console.error('Error al bloquear la cuenta:', error);
        }
      );
    } else {
      console.error('No se pudo bloquear la cuenta. Número de identidad no disponible.');
    }
  }

    
}
