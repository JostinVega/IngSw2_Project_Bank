import { Component } from '@angular/core';

@Component({
  selector: 'app-questions-sec-user-recovery',
  templateUrl: './questions-sec-user-recovery.component.html',
  styleUrls: ['./questions-sec-user-recovery.component.css']
})
export class QuestionsSecUserRecoveryComponent {
  // securityQuestionsForm: FormGroup;
  // questions = [
  //   "¿Cuál es el nombre de tu primera mascota?",
  //   "¿Cuál es tu comida favorita?",
  //   "¿Cuál es el nombre de tu escuela primaria?",
  //   "¿En qué ciudad naciste?",
  //   "¿Cuál es tu color favorito?"
  // ];
  // formErrors = ['', '', '', '', ''];
  // maxAttempts = 3;
  // attempts = 0;

  // // constructor(private fb: FormBuilder) {
  // //   this.securityQuestionsForm = this.fb.group({
  // //     question0: ['', Validators.required],
  // //     answer0: ['', Validators.required],
  // //     question1: ['', Validators.required],
  // //     answer1: ['', Validators.required],
  // //     question2: ['', Validators.required],
  // //     answer2: ['', Validators.required],
  // //     question3: ['', Validators.required],
  // //     answer3: ['', Validators.required],
  // //     question4: ['', Validators.required],
  // //     answer4: ['', Validators.required]
  // //   });
  // }

  // onQuestionChange(index: number) {
  //   const selectedQuestion = this.securityQuestionsForm.get(`question${index}`).value;
  //   this.questions = this.questions.filter(q => q !== selectedQuestion);
  // }

  // onSubmit() {
  //   if (this.securityQuestionsForm.valid) {
  //     // Validar respuestas aquí
  //     const correctAnswers = [/* respuestas correctas */];
  //     let allCorrect = true;

  //     for (let i = 0; i < 5; i++) {
  //       if (this.securityQuestionsForm.get(`answer${i}`).value !== correctAnswers[i]) {
  //         this.formErrors[i] = 'Respuesta incorrecta.';
  //         allCorrect = false;
  //         this.attempts++;
  //         if (this.attempts >= this.maxAttempts) {
  //           this.lockAccount();
  //           return;
  //         }
  //       } else {
  //         this.formErrors[i] = '';
  //       }
  //     }

  //     if (allCorrect) {
  //       this.proceedToVerification();
  //     }
  //   } else {
  //     // Manejar formulario inválido
  //     Object.keys(this.securityQuestionsForm.controls).forEach(key => {
  //       if (this.securityQuestionsForm.get(key).invalid) {
  //         const index = key.replace('question', '').replace('answer', '');
  //         this.formErrors[index] = 'Este campo es obligatorio.';
  //       }
  //     });
  //   }
  // }

  // proceedToVerification() {
  //   // Redirigir a la página de verificación de código
  // }

  // lockAccount() {
  //   // Bloquear cuenta y redirigir al inicio de sesión
  // }

  // goBack() {
  //   // Redirigir a la página anterior
  // }
}
