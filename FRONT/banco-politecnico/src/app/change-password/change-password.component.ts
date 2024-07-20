// change-password.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { PasswordService } from '../services/password.service.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  numeroIdentidad: string = '';
  usuario: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    private passwordService: PasswordService,
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

  goBack() {
    this.router.navigate(['/previous-route']);
  }

  async changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
      return;
    }

    if (!this.isPasswordValid(this.newPassword)) {
      alert('La contraseña no cumple con los requisitos de seguridad.');
      return;
    }

    try {
      const credenciales = await this.autenticacionService.obtenerCredenciales(this.usuario).toPromise();
      const passwordMatches = await bcrypt.compare(this.currentPassword, credenciales.contrasena);

      if (!passwordMatches) {
        alert('La contraseña actual es incorrecta. Por favor, inténtelo de nuevo.');
        return;
      }

      await this.updatePassword(this.numeroIdentidad, this.newPassword);
      console.log('Password changed successfully.');
      this.router.navigate(['/confirm-change-password']);
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error al cambiar la contraseña. Por favor, inténtelo de nuevo.');
    }
  }

  async updatePassword(numero_identidad: string, password: string): Promise<void> {

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const response = await this.http.put(`http://localhost:4000/actualizar-contrasena/${numero_identidad}`, { contrasena: hashedPassword }).toPromise();
      console.log('Response:', response);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
    try {
      const response = await this.http.put(`http://localhost:4000/update-contrasena/${numero_identidad}`, { contrasena: hashedPassword }).toPromise();
      console.log('Response:', response);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

  isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}
