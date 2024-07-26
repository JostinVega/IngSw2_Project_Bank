import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../services/informacion-registro.service';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private registroService: RegistroService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      numeroIdentidad: ['', [
        Validators.required,
        Validators.pattern(/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30)\d{8}$/)
    
      ]],
      nombre_completo: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/) // Solo permite letras y espacios
      ]],
      correo_electronico: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|epn\.edu\.ec)$/)
      ]],
      numero_telefono: ['', [
        Validators.required,
        Validators.pattern(/^09\d{8}$/) // Empieza con '09' y exactamente 10 dígitos
      ]],
      fecha_nacimiento: ['', [
        Validators.required,
        this.mayorDeEdadValidator()
      ]]
    });
  }

  ngOnInit(): void {}

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  /*async onSubmit(): Promise<void> {
    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.value;
  
      try {
        const isDuplicate = await this.checkDuplicateData(formValues);
        if (!isDuplicate) {
          const email = this.registrationForm.get('correo_electronico')?.value;
          const phoneNumberRegistro = this.registrationForm.get('numero_telefono')?.value;
          console.log(phoneNumberRegistro);
          const phoneNumber = `+593${phoneNumberRegistro.slice(1)}`;
          console.log(phoneNumber);
          formValues.numero_telefono = phoneNumber;
          this.registroService.setRegistrationData('step1', formValues);
  
          // Primer envío del código de verificación
          this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
            (response: any) => {
              console.log('Primer código de seguridad enviado:', response);
  
              // Reenvío automático del código de verificación
              this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
                (secondResponse: any) => {
                  console.log('Segundo código de seguridad enviado:', secondResponse);
                  this.router.navigate(['/verificar']);
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
          this.errorMessage = 'Uno o más datos ya están registrados.';
        }
      } catch (error) {
        console.error('Error al verificar datos duplicados:', error);
        this.errorMessage = 'Error del servidor. Por favor, inténtelo de nuevo más tarde.';
      }
    }
  }*/
  

  async onSubmit(): Promise<void> {
    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.value;

      try {
        const isDuplicate = await this.checkDuplicateData(formValues);
        if (!isDuplicate) {
          const email = this.registrationForm.get('correo_electronico')?.value;
          const phoneNumberRegistro = this.registrationForm.get('numero_telefono')?.value;
          console.log(phoneNumberRegistro);
          const phoneNumber = `+593${phoneNumberRegistro.slice(1)}`;
          console.log(phoneNumber);
          formValues.numero_telefono = phoneNumber;
          this.registroService.setRegistrationData('step1', formValues);
          
          this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
            (response: any) => {
              console.log(response);
              this.router.navigate(['/verificar']);
            },
            (error) => {
              console.error('Error al enviar el código de verificación:', error);
            }
          );
          //this.router.navigate(['/verificar']);
        } else {
          this.errorMessage = 'Uno o más datos ya están registrados.';
        }
      } catch (error) {
        console.error('Error al verificar datos duplicados:', error);
        this.errorMessage = 'Error del servidor. Por favor, inténtelo de nuevo más tarde.';
      }
    }
  }

  private async checkDuplicateData(formValues: any): Promise<boolean> {
    const formattedPhoneNumber = `+593${formValues.numero_telefono.slice(1)}`;
    
    let identityExists = true;
    let emailExists = true;
    let phoneExists = true;

    try {
      await this.registroService.getUsuarioByNumeroIdentidadRegistro(formValues.numeroIdentidad).toPromise();
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        identityExists = false;
      } else {
        console.error('Error en la consulta de identidad:', error);
        throw new Error('Error en la consulta de identidad');
      }
    }

    try {
      await this.registroService.getUsuarioByCorreoElectronico(formValues.correo_electronico).toPromise();
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        emailExists = false;
      } else {
        console.error('Error en la consulta de correo electrónico:', error);
        throw new Error('Error en la consulta de correo electrónico');
      }
    }

    try {
      await this.registroService.getUsuarioByNumeroTelefono(formattedPhoneNumber).toPromise();
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        phoneExists = false;
      } else {
        console.error('Error en la consulta de número de teléfono:', error);
        throw new Error('Error en la consulta de número de teléfono');
      }
    }

    if (!identityExists && !emailExists && !phoneExists) {
      return false; // Si ninguna de las consultas encontró un duplicado, se puede continuar con el registro
    } else {
      this.errorMessage = '';
      if (identityExists) {
        this.errorMessage += 'Número de Identidad ya registrado. ';
      }
      if (emailExists) {
        this.errorMessage += 'Correo Electrónico ya registrado. ';
      }
      if (phoneExists) {
        this.errorMessage += 'Número de Teléfono ya registrado. ';
      }
      return true;
    }
  }

  goBack(): void {
    window.history.back();
  }

  /*onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/[^\d]/g, ''); 
    inputValue = inputValue.slice(0, 10); 
    this.registrationForm.get('numeroIdentidad')?.setValue(inputValue, { emitEvent: false }); 
  }

  onInputChangePhone(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/[^\d]/g, ''); 
    inputValue = inputValue.slice(0, 10); 
    this.registrationForm.get('numero_telefono')?.setValue(inputValue, { emitEvent: false }); 
  }*/

  onInputChange(event: any): void {
    let input = event.target.value;
    // Elimina cualquier carácter no numérico
    input = input.replace(/[^0-9]/g, '');
    // Limita la longitud a 10 caracteres
    const sanitizedInput = input.slice(0, 10);
    this.registrationForm.get('numeroIdentidad')?.setValue(sanitizedInput, { emitEvent: false });
  
    // Actualiza el valor en el campo de texto
    event.target.value = sanitizedInput;
  }
  
  onInputChangePhone(event: any): void {
    let input = event.target.value;
    // Elimina cualquier carácter no numérico
    input = input.replace(/[^0-9]/g, '');
    // Limita la longitud a 10 caracteres
    const sanitizedInput = input.slice(0, 10);
    this.registrationForm.get('numero_telefono')?.setValue(sanitizedInput, { emitEvent: false });
  
    // Actualiza el valor en el campo de texto
    event.target.value = sanitizedInput;
  }

  onInputChangeName(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); 
    this.registrationForm.get('nombre_completo')?.setValue(inputValue, { emitEvent: false });
  }

  private mayorDeEdadValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const fechaNacimiento = new Date(control.value);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      return edad >= 18 ? null : { 'menorDeEdad': true };
    };
  }
}
