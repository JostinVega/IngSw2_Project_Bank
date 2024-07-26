import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';

interface FAQ {
  question: string;
  answer: string;
}

interface Subcategory {
  name: string;
  faqs: FAQ[];
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  searchTerm: string = '';
  numeroIdentidad: string = '';
  usuario: string = '';

  categories: Category[] = [
    {
      name: 'Gestión de Cuenta',
      subcategories: [
        {
          name: 'Información de la Cuenta',
          faqs: [
            { question: '¿Qué tipos de cuentas ofrece el banco?', answer: 'El banco ofrece cuentas de ahorro y corrientes.' },
            { question: '¿Cómo abrir una nueva cuenta bancaria?', answer: 'Para abrir una nueva cuenta bancaria, visita una sucursal del banco con tu identificación y un comprobante de domicilio, o hazlo en línea a través de nuestra página web en la sección "Abrir una Cuenta".' },
            { question: '¿Hay un máximo de cuentas que puede abrir un usuario?', answer: 'Sí, un usuario puede abrir hasta dos cuentas de cada tipo (ahorro y corriente) para uso personal.' },
          ]
        },
        {
          name: 'Seguridad de la Cuenta',
          faqs: [
            { question: '¿Cómo proteger mi cuenta?', answer: 'Utiliza contraseñas seguras, no compartas tu información de acceso y activa la autenticación de dos factores.' },
            { question: '¿Qué hacer en caso de actividad sospechosa en mi cuenta?', answer: 'Contacta inmediatamente al servicio de atención al cliente y cambia tu contraseña.' },
            { question: '¿Cómo debe ser una contraseña segura?', answer: 'Una contraseña segura debe tener al menos 8 caracteres, incluir una combinación de letras mayúsculas y minúsculas, números y caracteres especiales. Además, evita usar información personal obvia como tu nombre o fecha de nacimiento.' },
            { question: '¿Cada cuánto se debe cambiar la contraseña?', answer: 'Es recomendable cambiar tu contraseña al menos cada 3 a 6 meses para mantener la seguridad de tu cuenta.' },
            { question: '¿Consejos para colocar una buena contraseña?', answer: '1. Usa una frase larga y única. 2. Evita palabras comunes o secuencias numéricas. 3. Incluye caracteres especiales y números. 4. No reutilices contraseñas antiguas. 5. Utiliza un administrador de contraseñas para generar y almacenar contraseñas seguras.' }
          ]
        },
        {
          name: 'Información de Usuario',
          faqs: [
            { question: '¿Cómo ver mi información de usuario?', answer: 'Para ver tu información de usuario, ve a "Mi perfil" y selecciona "Ver usuario".' },
            { question: '¿Cómo actualizar mi información personal?', answer: 'Para actualizar tu información personal, ve a "Mi perfil" y selecciona "Actualizar información personal".' },
            { question: '¿Cómo cambiar mi contraseña?', answer: 'Para cambiar tu contraseña, ve a "Mi perfil" y selecciona "Cambiar contraseña".' }
          ]
        }
      ]
    },
    {
      name: 'Operaciones Bancarias',
      subcategories: [
        {
          name: 'Transferencias',
          faqs: [
            { question: '¿Cómo realizar una transferencia?', answer: 'Para realizar una transferencia, ve a "Transacciones" y selecciona "Transferencias".' },
            { question: '¿Puedo agregar beneficiarios para transferencias rápidas?', answer: 'Sí, puedes agregar beneficiarios frecuentes en la sección "Beneficiarios" para facilitar transferencias rápidas y seguras.' },
            { question: '¿Cómo verificar que mi transferencia fue exitosa?', answer: 'Después de completar una transferencia, recibirás una confirmación en pantalla y un correo electrónico con los detalles de la transacción. También puedes verificar el estado de la transferencia en la sección "Historial de Transacciones" de tu cuenta en línea.' },
            { question: '¿Cuánto tiempo tarda una transferencia en procesarse?', answer: 'Las transferencias dentro del mismo banco suelen ser instantáneas.' },
            { question: '¿Puedo realizar transferencias entre mis cuentas?', answer: 'Sí, puedes realizar transferencias entre tus cuentas del mismo banco de forma instantánea.' },
            { question: '¿Puedo realizar transferencias hacia otros bancos?', answer: 'No, actualmente no es posible realizar transferencias hacia otros bancos.' },
            { question: '¿Puedo agregar un contacto como favorito?', answer: 'Sí, puedes marcar un contacto como favorito en la sección "Beneficiarios" para facilitar futuras transferencias.' },
            { question: '¿Cómo accedo a mi lista de contactos?', answer: 'Para acceder a tu lista de contactos, ve a "Transacciones" y selecciona "Beneficiarios" donde podrás ver y gestionar tus contactos.' },
            { question: '¿En qué formato puedo descargar mis comprobantes de transferencia?', answer: 'Puedes descargar tus comprobantes de transferencia en formato PDF y PNG desde la sección "Historial de Transacciones" y al finalizar cada transacción.' }


          ]
        },
        {
          name: 'Pagos y Facturas',
          faqs: [
            { question: '¿Cómo pagar una factura?', answer: 'Para pagar una factura, ve a "Transacciones" y selecciona "Pagos de facturas".' },
            { question: '¿Cómo puedo pagar mis servicios a través del Banco Politécnico?', answer: 'Para pagar tus servicios, inicia sesión en tu cuenta, selecciona "Pagos de Servicios", elige el servicio que deseas pagar, ingresa los detalles requeridos y confirma el pago.' },
            { question: '¿Qué servicios puedo pagar a través del Banco Politécnico?', answer: 'Puedes pagar una variedad de servicios como electricidad, agua y telefonía.' },
            { question: '¿Hay algún cargo por pagar facturas a través del banco?', answer: 'No, el Banco Politécnico no cobra cargos por el pago de facturas a través de su plataforma.' }

          ]
        },
        {
          name: 'Historial y Reportes',
          faqs: [
            { question: '¿Cómo ver mi historial de transacciones?', answer: 'Para ver tu historial de transacciones, ve a "Transacciones" y selecciona "Historial de transacciones".' },
            { question: '¿Puedo descargar mi historial de transacciones?', answer: 'Sí, puedes descargar tu historial de transacciones en formato PDF o CSV desde la sección "Historial de transacciones".' },
            { question: '¿Cómo reportar un problema?', answer: 'Para reportar un problema, ve a "Ayuda/Soporte" y selecciona "Reportar un problema".' }
          ]
        }
      ]
    },
    {
      name: 'Soporte y Ayuda',
      subcategories: [
        {
          name: 'Contacto y Soporte',
          faqs: [
            { question: '¿Cómo puedo contactar al soporte?', answer: 'Para contactar al soporte, ve a "Ayuda/Soporte" y selecciona "Contactar soporte".' },
            { question: '¿Cómo reportar un problema?', answer: 'Para reportar un problema, ve a "Ayuda/Soporte" y selecciona "Reportar un problema".' },
            { question: '¿Cómo obtener asistencia en línea?', answer: 'Puedes obtener asistencia en línea utilizando el chat en vivo disponible en nuestra página web o enviando un correo electrónico a nuestro equipo de soporte.' }
          ]
        },
        {
          name: 'Preguntas Frecuentes Generales',
          faqs: [
            { question: '¿Qué necesito para registrar una cuenta en el Banco Politécnico?', answer: 'Para registrar una cuenta necesitas proporcionar tu nombre completo, número de identificación, dirección de correo electrónico, número de teléfono, y fecha de nacimiento.' },
            { question: '¿Qué servicios ofrece Banco Politécnico?', answer: 'Banco Politécnico ofrece servicios de transferencias entre cuentas del banco y pagos de servicios públicos y privados.' },
            { question: '¿Hay algún costo por realizar transferencias entre cuentas del Banco Politécnico?', answer: 'No, las transferencias entre cuentas del Banco Politécnico son gratuitas.' }
          ]
        }
      ]
    }
  ];
  
  

  filteredCategories: Category[] = [...this.categories];

  @ViewChildren('faqQuestion') faqQuestions!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numeroIdentidad = params['numeroIdentidad'];
      this.usuario = params['usuario'];
      console.log('Numero de Identidad recibido:', this.numeroIdentidad);
      console.log('Usuario recibido:', this.usuario);
    });
  }

  toggleFaq(target: EventTarget | null) {
    if (target instanceof HTMLButtonElement) {
      const faqAnswer = target.nextElementSibling as HTMLElement;

      target.classList.toggle('active');

      if (target.classList.contains('active')) {
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      } else {
        faqAnswer.style.maxHeight = '0';
      }
    }
  }

  filterFAQs(event: Event) {
    event.preventDefault();

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCategories = this.categories.map(category => {
      const filteredSubcategories = category.subcategories.map(subcategory => {
        const filteredFAQs = subcategory.faqs.filter(faq =>
          faq.question.toLowerCase().includes(searchTermLower) || faq.answer.toLowerCase().includes(searchTermLower)
        );
        return { ...subcategory, faqs: filteredFAQs };
      }).filter(subcategory => subcategory.faqs.length > 0);

      return { ...category, subcategories: filteredSubcategories };
    }).filter(category => category.subcategories.length > 0);
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
}
