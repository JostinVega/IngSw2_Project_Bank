import { Component } from '@angular/core';

@Component({
  selector: 'app-change-username-recovery',
  templateUrl: './change-username-recovery.component.html',
  styleUrls: ['./change-username-recovery.component.css']
})
export class ChangeUsernameRecoveryComponent {
  username: string = '';
  usernameError: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.username) {
      this.http.post('/api/change-username', { username: this.username }).subscribe(
        response => {
          // Manejar respuesta exitosa
          console.log('Nombre de usuario cambiado exitosamente:', response);
          this.router.navigate(['/home']);
        },
        error => {
          // Manejar errores
          this.usernameError = 'Error al cambiar el nombre de usuario.';
          console.error('Error:', error);
        }
      );
    } else {
      this.usernameError = 'El nombre de usuario es obligatorio.';
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
