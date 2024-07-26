import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../services/informacion-registro.service';
import * as bcrypt from 'bcryptjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.registrationForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9._-]+$'),
          this.checkUsernameStrength.bind(this) // Custom validator function
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*].{8,}$')
        ]
      ],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator // Custom validator for password match
    });
  }

  ngOnInit() {}

  checkUsernameStrength(control: any): { [key: string]: boolean } | null {
    const username = control.value;

    // Check if username is too simple (example: 'aaaaaa')
    if (/^(.)\1{2,}$/.test(username)) {
      return { tooSimple: true };
    }

    return null;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      const username = this.registrationForm.value.username;
      const isUsernameTaken = await this.checkIfUsernameTaken(username);

      if (isUsernameTaken) {
        this.errorMessage = 'El nombre de usuario ya está en uso.';
      } else {
        const confirmed = window.confirm("¿Está seguro de que desea continuar con los datos ingresados?");
        if (confirmed) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(this.registrationForm.value.password, salt);

          this.registroService.setRegistrationData('step3', {
            username: this.registrationForm.value.username,
            password: hashedPassword
          });
          this.router.navigate(['/preguntas-seguridad']);
        }
      }
    } else {
      console.error('Formulario no válido');
      this.registrationForm.markAllAsTouched(); 
    }
  }

  private async checkIfUsernameTaken(username: string): Promise<boolean> {
    try {
      const response = await this.registroService.getUsuarioByUsuarioRegistro(username).toPromise();
      return response.consulta;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return false; // Username not found, can be used
      } else {
        console.error('Error al verificar el nombre de usuario:', error);
        throw new Error('Error al verificar el nombre de usuario');
      }
    }
  }
}
