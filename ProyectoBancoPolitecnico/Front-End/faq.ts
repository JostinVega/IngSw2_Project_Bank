import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-security-check',
  templateUrl: './security-check.component.html'
})
export class SecurityCheckComponent {
  answers = [
    { questionId: '1', answer: '' },
    { questionId: '2', answer: '' },
    { questionId: '3', answer: '' }
  ];

  constructor(private http: HttpClient) {}

  verifyAnswers() {
    const payload = {
      userId: '12345',
      securityAnswers: this.answers
    };

    this.http.post('http://localhost:3000/verify-security-answers', payload)
      .subscribe(response => {
        // Manejar la respuesta del servidor
        console.log(response);
      });
  }
}
