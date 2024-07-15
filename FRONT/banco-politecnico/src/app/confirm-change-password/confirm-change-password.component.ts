import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-change-password',
  templateUrl: './confirm-change-password.component.html',
  styleUrls: ['./confirm-change-password.component.css']
})
export class ConfirmChangePasswordComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/previous-route']);
  }

  login() {
    this.router.navigate(['/home']);
  }
}