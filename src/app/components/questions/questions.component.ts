import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { UtilitysService } from 'src/app/services/utilitys.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  id: any = 0;
  limitNumber: number = 7;

  name: string = "";
  questionList: any = [];
  answerList: any = [];
  currentQuestion: number = 0;
  points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;

  constructor(private utilityService: UtilitysService) { }

  ngOnInit(): void {
  }

  goToTest(id: number) {
    this.id = id;
    this.name = localStorage.getItem("name")!;
    this.startCounter();
    this.getQuestions();
  }

  getQuestions() {
    this.utilityService.getQuestions(this.id).subscribe((response: any) => {
      // console.table('RESPONSE: ', response);
      this.orderQuestions(response);
    }, (error: any) => {
      console.error(error);
    });
  }

  orderQuestions(questions: []) {

    this.questionList = [];

    while (this.questionList.length < this.limitNumber) {
      // Generamos un número aleatorio entre 0 y 14
      let numeroAleatorio = Math.floor(Math.random() * 15);
      // Si el número aleatorio no está repetido, lo agregamos al arreglo de preguntas seleccionadas
      if (!this.questionList.includes(questions[numeroAleatorio])) {
        this.questionList.push(questions[numeroAleatorio]);
      }
    }

    console.table('PREGUNTAS: ', this.questionList);
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any, correct: any, questionId: any) {

    this.answerList.push(questionId);

    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.postPuntaje();
      this.stopCounter();
    }

    if (option == correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    } else {
      this.points -= 10;
      this.inCorrectAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    }
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.inCorrectAnswer++;
          this.resetCounter();
          this.getProgressPercent();
          this.points -= 10;
          if (this.currentQuestion === this.questionList.length) {
            this.postPuntaje();
            this.isQuizCompleted = true;
            this.stopCounter();
          }
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

  postPuntaje(){
    let body = {
      puntaje : this.points,
      preguntas : this.answerList,
      claseID : this.id
    };
    this.utilityService.sendResults(body).subscribe((response: any) => {
      console.log('RESPONSE: ', response);
    }, (error: any) => {
      console.error(error);
    })
  }

}
