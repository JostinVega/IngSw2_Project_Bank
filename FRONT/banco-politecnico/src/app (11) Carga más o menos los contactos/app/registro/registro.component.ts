import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../services/informacion-registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      numero_identidad: ['', [
        Validators.required,
        Validators.pattern(/^17\d{8}$/) // Empieza con '17' y exactamente 10 dígitos
      ]],
      nombre_completo: ['', Validators.required],
      correo_electronico: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|epn\.edu\.ec)$/)
      ]],
      numero_telefono: ['', [
        Validators.required,
        Validators.pattern(/^09\d{8}$/) // Empieza con '09' y exactamente 10 dígitos
      ]],
      fecha_nacimiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.registroService.setRegistrationData('step1', this.registrationForm.value);
      this.router.navigate(['/verificar']);
    }
  }

  goBack(): void {
    // Navigate back logic
    window.history.back();
  }

  onInputChange(event: Event): void {
    // Handle input change event
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    // Limit to 10 digits
    inputValue = inputValue.slice(0, 10); // Limit to 10 characters
    this.registrationForm.get('id')?.setValue(inputValue); // Set the cleaned value back to the form

  }

  onInputChangePhone(event: Event): void {
    // Handle input change event
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    // Limit to 10 digits
    inputValue = inputValue.slice(0, 10); // Limit to 10 characters
    this.registrationForm.get('phone')?.setValue(inputValue); // Set the cleaned value back to the form

  }
}

