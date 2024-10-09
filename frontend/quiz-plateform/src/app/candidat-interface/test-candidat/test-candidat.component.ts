import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { OptionService } from '../../services/option.service';
import { TestService } from '../../services/test.service';
import { Quiz } from '../../models/quiz';
import { Question } from '../../models/question';
import { Option } from '../../models/option';
import { Test } from '../../models/test';
import { TestResultService } from '../../services/test-result.service';
import { TestResult } from '../../models/testResult';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-test-candidat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './test-candidat.component.html',
  styleUrls: ['./test-candidat.component.css']
})
export class TestCandidatComponent implements OnInit {
  testId!: number;
  quizzes: Quiz[] = [];
  currentQuizIndex: number = 0;
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  selectedOption: number | null = null;
  showAnswer: boolean = false;
  remainingTime: string = '00:00:00'; // Formatted time
  totalQuestions: number = 0; // Total number of questions across all quizzes
  globalQuestionIndex: number = 0;
  timerInterval: any; // Pour stocker l'intervalle du minuteur
  isTestCompleted: boolean = false; // Variable pour vérifier si le test est terminé
  correctAnswersCount: number = 0; // Pour compter les réponses correctes
  userResponses: { questionId: number, selectedOptionId: number | null }[] = [];
  test!: Test;
  startTime: number = 0; // Temps de début du test en millisecondes
  currentUser!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService,
    private optionService: OptionService,
    private testResultService: TestResultService,
    private loginService: LoginService,
    private testService: TestService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTest(); // Chargez le test ici pour obtenir la durée
    this.loadQuizzes();
    this.currentUser = this.loginService.getUserDetails();
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this.handleCheatingDetection();
    //   }
    // });

    // Ajouter l'écouteur d'événements de changement de fenêtre
    // window.addEventListener('beforeunload', this.handleCheatingDetection.bind(this));
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval); 
    // window.removeEventListener('beforeunload', this.handleCheatingDetection.bind(this));
  }

  loadTest(): void {
    this.testService.getTestById(this.testId).subscribe(
      (data: Test) => {
        this.test = data;
        if (this.test.duree) {
          this.remainingTime = this.test.duree;
          this.startTime = Date.now();
          this.startTimer();
        } else {
          console.error('Durée du test invalide');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du test', error);
      }
    );
  }

  loadQuizzes(): void {
    this.quizService.getQuizzesByTest(this.testId).subscribe(
      (quizzes: Quiz[]) => {
        this.quizzes = quizzes;
        this.calculateTotalQuestions();
        this.loadQuestionsForCurrentQuiz();
      },
      (error) => {
        console.error('Erreur lors de la récupération des quizzes', error);
      }
    );
  }

  calculateTotalQuestions(): void {
    this.totalQuestions = 0;

    // Créez un tableau de promesses pour les requêtes de questions
    const questionRequests = this.quizzes.map(quiz =>
      this.questionService.getQuestionsByQuiz(quiz.id).toPromise().then(
        (questions: Question[] | undefined) => {
          // Ajoutez le nombre de questions au total si `questions` n'est pas `undefined`
          if (questions) {
            this.totalQuestions += questions.length;
          } else {
            console.error(`Pas de questions trouvées pour le quiz avec l'id ${quiz.id}`);
          }
        },
        (error) => {
          console.error(`Erreur lors de la récupération des questions pour le quiz avec l'id ${quiz.id}`, error);
        }
      )
    );

    // Attendez que toutes les promesses se résolvent
    Promise.all(questionRequests).then(() => {
      console.log('Total des questions calculé:', this.totalQuestions);
    }).catch(error => {
      console.error('Erreur lors du calcul du total des questions:', error);
    });
  }

  loadQuestionsForCurrentQuiz(): void {
    const currentQuiz = this.quizzes[this.currentQuizIndex];
    if (currentQuiz) {
      this.questionService.getQuestionsByQuiz(currentQuiz.id).subscribe(
        (questions: Question[]) => {
          this.questions = questions;
          this.loadOptionsForQuestions();
        },
        (error) => {
          console.error('Erreur lors de la récupération des questions', error);
        }
      );
    }
  }

  loadOptionsForQuestions(): void {
    // Créez un tableau de promesses pour les requêtes d'options
    const optionRequests = this.questions.map(question =>
      this.optionService.getOptionsByQuestion(question.id).toPromise().then(
        (options: Option[] | undefined) => {
          // Assignez les options à la question uniquement si `options` est défini
          if (options) {
            question.options = options;
          } else {
            console.error(`Pas d'options trouvées pour la question avec l'id ${question.id}`);
          }
        },
        (error) => {
          console.error(`Erreur lors de la récupération des options pour la question avec l'id ${question.id}`, error);
        }
      )
    );

    // Attendez que toutes les promesses se résolvent
    Promise.all(optionRequests).then(() => {
      console.log('Options chargées pour toutes les questions.');
    }).catch(error => {
      console.error('Erreur lors du chargement des options:', error);
    });
  }

  submitAnswer(): void {
    this.showAnswer = true;
    setTimeout(() => {
      const selectedOption = this.questions[this.currentQuestionIndex]?.options.find(option => option.id === this.selectedOption);
      if (selectedOption?.correct) {
        this.correctAnswersCount++;
      }
      this.nextQuestion();
    }, 1000);
  }

  nextQuestion(): void {
    this.showAnswer = false;
    this.selectedOption = null;
    this.currentQuestionIndex++;
    this.globalQuestionIndex++;

    if (this.globalQuestionIndex >= this.totalQuestions) {
      this.endTest();
    } else {
      if (this.currentQuestionIndex >= this.questions.length) {
        this.currentQuestionIndex = 0;
        this.currentQuizIndex++;
        this.loadQuestionsForCurrentQuiz();
      }
    }
  }

  endTest(): void {
    this.isTestCompleted = true;
    clearInterval(this.timerInterval);

    const timeSpent = this.calculateTimeSpent();

    const currentUser: User = this.loginService.getUserDetails(); 

    if (!currentUser) {
      console.error('Utilisateur non trouvé');
      return;
    }

    const testResult: TestResult = {
      id: 0, 
      score: (this.correctAnswersCount / this.totalQuestions) * 100,
      totalQuestion:this.totalQuestions,
      correctAnswers:this.correctAnswersCount,
      tempspasse: timeSpent,
      date: new Date(),
      user: currentUser,
      test: { id: this.testId } as Test 
    };

    this.testResultService.createTestResult(testResult).subscribe(
      (result) => {
        console.log('Résultat du test sauvegardé avec succès:', result);
        this.router.navigate(['/results-candidat', result.id]);
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde du résultat du test', error);
      }
    );
  }

  calculateTimeSpent(): string {
    const endTime = Date.now();
    const elapsedTimeInSeconds = Math.floor((endTime - this.startTime) / 1000); 
    return this.formatTime(elapsedTimeInSeconds);
  }

  parseDuration(duration: string): number {
    const parts = duration.split(':').map(part => parseInt(part, 10));
    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      // Vérifiez que les parties sont valides
      if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
        return (hours * 3600) + (minutes * 60) + seconds;
      }
    }
    console.error('Format de durée invalide:', duration);
    return 0; // Retourne 0 en cas de format invalide
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  }
  @HostListener('window:blur', ['$event'])
  onWindowBlur(event: any): void {
    this.handleCheatingDetection();
  }

  handleCheatingDetection(): void {
    if (this.currentUser) {
      this.currentUser.locked = true; // Bloquer l'utilisateur
      this.userService.updateUserInfo(this.currentUser.id, this.currentUser).subscribe(
        (updatedUser) => {
          console.log('Utilisateur bloqué avec succès:', updatedUser);
          this.router.navigate(['/error']);
          this.loginService.logout(); 
        },
        (error) => {
          console.error('Erreur lors du blocage de l\'utilisateur', error);
        }
      );
    } else {
      console.error('Utilisateur non trouvé');
    }
  }


  startTimer(): void {
    const [hours, minutes, seconds] = this.remainingTime.split(':').map(Number);
  
    // Vérifiez que les heures, minutes et secondes sont des nombres valides
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      console.error('Temps restant invalide:', this.remainingTime);
      return;
    }
  
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    let remainingSeconds = totalSeconds;
  
    this.timerInterval = setInterval(() => {
      if (remainingSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.endTest();
      } else {
        remainingSeconds--;
        this.remainingTime = this.formatTime(remainingSeconds);
      }
    }, 1000);
  }
  
}
