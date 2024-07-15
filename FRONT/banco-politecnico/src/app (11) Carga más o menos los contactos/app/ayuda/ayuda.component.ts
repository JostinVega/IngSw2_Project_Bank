import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent {
  faqList = [
    {
      question: '¿Qué necesito para registrar una cuenta en el Banco Politécnico?',
      answer: 'Para registrar una cuenta necesitas proporcionar tu nombre completo, número de identificación, dirección de correo electrónico, número de teléfono, y fecha de nacimiento.'
    },
    {
      question: '¿Qué hago si olvidé mi contraseña?',
      answer: 'Si olvidaste tu contraseña, haz clic en "Olvidé mi contraseña" en la página de inicio de sesión y sigue las instrucciones para restablecerla.'
    },
    {
      question: '¿Qué servicios ofrece Banco Politécnico?',
      answer: 'Banco Politécnico ofrece servicios de transferencias entre cuentas del banco y pagos de servicios públicos y privados.'
    },
    {
      question: '¿Qué tipo de servicios puedo pagar a través del Banco Politécnico?',
      answer: 'Puedes pagar una variedad de servicios como electricidad, agua y telefonía.'
    },
    {
      question: '¿Hay algún costo por realizar transferencias entre cuentas del Banco Politécnico?',
      answer: 'No, las transferencias entre cuentas del Banco Politécnico son gratuitas.'
    },
    {
      question: '¿Cómo puedo verificar que mi transferencia fue exitosa?',
      answer: 'Después de completar una transferencia, recibirás una confirmación en pantalla y un correo electrónico con los detalles de la transacción. También puedes verificar el estado de la transferencia en la sección "Historial de Transacciones" de tu cuenta en línea.'
    },
    {
      question: '¿Puedo agregar beneficiarios para transferencias rápidas?',
      answer: 'Sí, puedes agregar beneficiarios frecuentes en la sección "Beneficiarios" para facilitar transferencias rápidas y seguras.'
    },
    {
      question: '¿Qué debo hacer si encuentro un error en mi transferencia?',
      answer: 'Si encuentras un error en tu transferencia, comunícate de inmediato con el servicio de atención al cliente del Banco Politécnico a través de nuestro número de teléfono o correo electrónico de soporte.'
    },
    {
      question: '¿Cómo puedo pagar mis servicios a través del Banco Politécnico?',
      answer: 'Para pagar tus servicios, inicia sesión en tu cuenta, selecciona "Pagos de Servicios", elige el servicio que deseas pagar, ingresa los detalles requeridos y confirma el pago.'
    },
    {
      question: '¿Cómo puedo contactar al servicio de atención al cliente?',
      answer: 'Puedes contactar al servicio de atención al cliente del Banco Politécnico a través de nuestro número de teléfono, correo electrónico, o utilizando el chat en vivo disponible en nuestra página web.'
    }
  ];

  @ViewChildren('faqQuestion') faqQuestions!: QueryList<ElementRef>;

  constructor() {}

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
}
