import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AutenticacionService, private router: Router) {
    this.homeForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.homeForm.valid) {
      this.authService.obtenerCredenciales(this.homeForm.value.usuario).subscribe(
        async (response: any) => {
          if (response && response.contrasena) {
            const passwordMatches = await bcrypt.compare(this.homeForm.value.contrasena, response.contrasena);
            if (passwordMatches) {
              console.log('Navigating with usuario:', this.homeForm.value.usuario);
              this.router.navigate(['/inicio'], { queryParams: { usuario: this.homeForm.value.usuario } });
            } else {
              this.errorMessage = 'Usuario o contraseña está incorrecto';
            }
          } else {
            this.errorMessage = 'Error al obtener las credenciales';
          }
        },
        (error: any) => {
          console.error('Error durante el inicio de sesión:', error);
          this.errorMessage = 'Error del servidor. Por favor, inténtelo de nuevo más tarde.';
        }
      );
    } else {
      if (this.homeForm.get('usuario')?.invalid) {
        this.errorMessage = 'Usuario requerido';
      } else if (this.homeForm.get('contrasena')?.invalid) {
        this.errorMessage = 'Ingresar la contraseña';
      } else {
        this.errorMessage = 'Llenar los campos requeridos';
      }
    }
  }
}
