import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-user-recovery',
  templateUrl: './confirmar-user-recovery.component.html',
  styleUrls: ['./confirmar-user-recovery.component.css']
})
export class ConfirmarUserRecoveryComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/inicio']);
  }
}
