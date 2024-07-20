import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-answer-security-questions',
  templateUrl: './answer-security-questions.component.html',
  styleUrls: ['./answer-security-questions.component.css']
})
export class AnswerSecurityQuestionsComponent implements OnInit {
  cedula: string = '';
  usuario: any;
  questions: string[] = [];
  answers: string[] = [];
  correctAnswers: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cedula = params['cedula'];
      this.obtenerUsuarioConLabels();
    });
  }

  obtenerUsuarioConLabels() {
    this.usuarioService.getUsuarioWithLabels(this.cedula).subscribe(
      response => {
        console.log('Usuario con labels:', response);
        this.usuario = response;
        this.questions = response.labels || [];
        this.answers = new Array(this.questions.length).fill('');
        this.correctAnswers = [
          response.answer1,
          response.answer2,
          response.answer3,
          response.answer4,
          response.answer5
        ];
      },
      error => {
        console.error('Error al obtener el usuario con labels:', error);
        this.questions = [];
        this.answers = [];
      }
    );
  }

  goBack() {
    this.router.navigate(['/previous-route']);
  }

  validateAnswers() {
    for (let answer of this.answers) {
      if (!answer.trim()) {
        alert('Debe completar todas las preguntas');
        return;
      }
    }

    const allCorrect = this.answers.every((answer, index) => answer === this.correctAnswers[index]);
    if (allCorrect) {
      console.log('Respuestas correctas');
      this.router.navigate(['/verify-identity'], { queryParams: { cedula: this.cedula } });
    } else {
      alert('Respuestas incorrectas, por favor intente nuevamente.');
    }
  }
}
