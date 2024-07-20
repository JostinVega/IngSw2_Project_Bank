import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-update-personal',
  templateUrl: './confirmar-update-personal.component.html',
  styleUrls: ['./confirmar-update-personal.component.css']
})
export class ConfirmarUpdatePersonalComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/inicio']);
  }
}
