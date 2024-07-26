import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../services/informacion-registro.service';  // Importar RegistroService
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas-seguridad',
  templateUrl: './preguntas-seguridad.component.html',
  styleUrls: ['./preguntas-seguridad.component.css']
})
export class PreguntasSeguridadComponent {
  securityQuestionsForm: FormGroup;
  answeredQuestions: Set<string> = new Set<string>();

  questions = [
    { value: 'q1', label: '¿Cuál es el nombre de tu primera mascota?' },
    { value: 'q2', label: '¿Cuál es tu comida favorita?' },
    { value: 'q3', label: '¿En qué ciudad naciste?' },
    { value: 'q4', label: '¿Cuál es el nombre de tu mejor amigo de la infancia?' },
    { value: 'q5', label: '¿Cuál fue tu primer empleo?' },
    { value: 'q6', label: '¿Cuál es tu libro favorito?' },
    { value: 'q7', label: '¿Cuál es tu película favorita?' },
    { value: 'q8', label: '¿Cuál es tu deporte favorito?' },
    { value: 'q9', label: '¿Cuál es el nombre de tu escuela primaria?' },
    { value: 'q10', label: '¿Cuál es el nombre de tu primer profesor?' }
  ];

  constructor(
    private fb: FormBuilder, 
    private registroService: RegistroService,  // Inyectar RegistroService
    private router: Router
  ) {
    this.securityQuestionsForm = this.fb.group({
      question1: ['', Validators.required],
      answer1: ['', Validators.required],
      question2: ['', Validators.required],
      answer2: ['', Validators.required],
      question3: ['', Validators.required],
      answer3: ['', Validators.required],
      question4: ['', Validators.required],
      answer4: ['', Validators.required],
      question5: ['', Validators.required],
      answer5: ['', Validators.required]
    });
  }

  getQuestionLabel(value: string): string {
    const question = this.questions.find(q => q.value === value);
    return question ? question.label : 'Pregunta no encontrada';
  }
  
  onSubmit() {
    if (this.securityQuestionsForm.valid) {
      const confirmMessage = `
        ¿Desea continuar con las respuestas proporcionadas?
        Pregunta 1: ${this.getQuestionLabel(this.securityQuestionsForm.value.question1)} - Respuesta: ${this.securityQuestionsForm.value.answer1}
        Pregunta 2: ${this.getQuestionLabel(this.securityQuestionsForm.value.question2)} - Respuesta: ${this.securityQuestionsForm.value.answer2}
        Pregunta 3: ${this.getQuestionLabel(this.securityQuestionsForm.value.question3)} - Respuesta: ${this.securityQuestionsForm.value.answer3}
        Pregunta 4: ${this.getQuestionLabel(this.securityQuestionsForm.value.question4)} - Respuesta: ${this.securityQuestionsForm.value.answer4}
        Pregunta 5: ${this.getQuestionLabel(this.securityQuestionsForm.value.question5)} - Respuesta: ${this.securityQuestionsForm.value.answer5}
      `;

      if (confirm(confirmMessage)) {
        this.registroService.setRegistrationData('step4', this.securityQuestionsForm.value);
        this.router.navigate(['/tipo-cuenta']);
      } else {
        console.log('El usuario canceló la acción.');
      }
    } else {
      console.log('Formulario no válido');
      alert('Por favor, responde a todas las preguntas de seguridad antes de continuar.');
    }
  }
  

  goBack() {
    window.history.back();
  }

  onQuestionChange(controlName: string) {
    const answerControlName = controlName.replace('question', 'answer');
    const answerControl = this.securityQuestionsForm.get(answerControlName);
    if (answerControl && answerControl.valid && answerControl.value.trim() !== '') {
      this.answeredQuestions.add(answerControlName);
    }
  }

  isAnswerValid(answerControlName: string): boolean {
    return this.answeredQuestions.has(answerControlName);
  }

  getSelectedQuestions(): Set<string> {
    const selectedQuestions = new Set<string>();
    for (let i = 1; i <= 5; i++) {
      const questionControl = this.securityQuestionsForm.get(`question${i}`);
      if (questionControl && questionControl.value) {
        selectedQuestions.add(questionControl.value);
      }
    }
    return selectedQuestions;
  }

  isQuestionDisabled(questionValue: string): boolean {
    const selectedQuestions = this.getSelectedQuestions();
    return selectedQuestions.has(questionValue);
  }
}
