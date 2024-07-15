import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirm-reset',
  templateUrl: './confirm-reset.component.html',
  styleUrls: ['./confirm-reset.component.css']
})
export class ConfirmResetComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/previous-route']);
  }

  login() {
    this.router.navigate(['/home']);
  }
}