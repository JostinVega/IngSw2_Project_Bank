import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  cedula: string = '';
  private apiUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
    this.resetForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/
            )
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cedula = params['cedula'];
      console.log('Cédula recibida:', this.cedula);
    });
  }

  goBack() {
    this.router.navigate(['/previous-route']);
  }

  changePassword() {
    // Verificar si los campos están vacíos
    if (!this.newPassword.value || !this.confirmPassword.value) {
      alert('Todos los campos son obligatorios para continuar.');
      return;
    }

    // Verificar si los campos son inválidos
    if (this.resetForm.invalid) {
      this.markFormGroupTouched(this.resetForm);
      
      if (this.newPassword.invalid) {
        alert('Por favor, ingrese una nueva contraseña válida.');
      }
      
      if (this.confirmPassword.invalid) {
        if (this.confirmPassword.errors?.['required']) {
          alert('Por favor, confirme su nueva contraseña.');
        } else if (this.confirmPassword.errors?.['passwordMismatch']) {
          alert('Las contraseñas no coinciden.');
        }
      }
      
      return;
    }

    const newPassword = this.resetForm.get('newPassword')?.value;

    this.updatePassword(this.cedula, newPassword)
      .then(() => {
        console.log('Password changed successfully.');
        this.router.navigate(['/confirm-reset']);
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        alert('Error al cambiar la contraseña. Por favor, inténtelo de nuevo.');
      });
  }

  passwordMatchValidator(form: AbstractControl) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  async updatePassword(numeroIdentidad: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const response = await this.http
        .put(
          `${this.apiUrl}/actualizar-contrasena/${numeroIdentidad}`,
          { contrasena: hashedPassword }
        )
        .toPromise();
      console.log('Response:', response);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get newPassword() {
    return this.resetForm.get('newPassword')!;
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword')!;
  }
}
