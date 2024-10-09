import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbaradminComponent } from "../navbar-admin/navbar-admin.component";
import { SidebaradminComponent } from "../sidebar-admin/sidebar-admin.component";
import { Quiz } from '../../models/quiz';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { OptionService } from '../../services/option.service';
import { Question } from '../../models/question';
import { Option } from '../../models/option';

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [CommonModule, NavbaradminComponent, SidebaradminComponent, FormsModule],
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizdetailsComponent implements OnInit {
  quizDetails!: Quiz;
  editMode: string = '';
  editedTitre!: string;
  editedScore!: string;
  editedTemps!: string;
  newQuestionText!: string;
  newOptions: { text: string, correct: boolean }[] = [
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false }
  ];
  newCorrectOption: number = 0; // Initialisation de la propriété newCorrectOption
  addingQuestion: boolean = false;
  questions: Question[] = [];
  optionsMap: { [key: number]: Option[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,  // Ajoutez le Router
    private quizService: QuizService,
    private questionService: QuestionService,
    private optionService: OptionService
  ) {}

  ngOnInit(): void {
    const quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuizDetails(quizId);
  }

  loadQuizDetails(quizId: number): void {
    this.quizService.getQuizById(quizId).subscribe(
      (quiz: Quiz) => {
        this.quizDetails = quiz;
        this.loadQuestions(quizId);
      },
      (error) => {
        console.error('Erreur lors de la récupération du quiz', error);
      }
    );
  }

  loadQuestions(quizId: number): void {
    this.questionService.getQuestionsByQuiz(quizId).subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        this.questions.forEach(question => {
          this.loadOptions(question.id);
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des questions', error);
      }
    );
  }

  loadOptions(questionId: number): void {
    this.optionService.getOptionsByQuestion(questionId).subscribe(
      (options: Option[]) => {
        this.optionsMap[questionId] = options;
      },
      (error) => {
        console.error('Erreur lors de la récupération des options', error);
      }
    );
  }

  enterEditMode(field: string): void {
    this.editMode = field;
    if (field === 'titre') {
      this.editedTitre = this.quizDetails.titre;
    } else if (field === 'score') {
      this.editedScore = this.quizDetails.score.toString();
    } else if (field === 'temps') {
      this.editedTemps = this.quizDetails.temps;
    }
  }

  saveField(field: string): void {
    if (field === 'titre') {
      this.quizDetails.titre = this.editedTitre;
    } else if (field === 'score') {
      this.quizDetails.score = Number(this.editedScore);
    } else if (field === 'temps') {
      this.quizDetails.temps = this.editedTemps;
    }

    this.quizService.updateQuiz(this.quizDetails.id, this.quizDetails).subscribe(
      (updatedQuiz: Quiz) => {
        this.quizDetails = updatedQuiz;
        console.log('Quiz mis à jour avec succès');
        this.editMode = '';
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du quiz', error);
      }
    );
  }

  addQuestion(): void {
    this.addingQuestion = true;
  }

  saveNewQuestion(): void {
    const newQuestion: Question = {
      id: 0,
      question: this.newQuestionText,
      type: this.newOptions.filter(option => option.correct).length > 1 ? 'choix multiple' : 'choix unique',
      options: [],
      quiz: this.quizDetails
    };

    this.questionService.createQuestion(newQuestion).subscribe(
      (question: Question) => {
        const optionsToCreate = this.newOptions.map(optionData => ({
          id: 0,
          texte: optionData.text,
          correct: optionData.correct,
          question: question
        }));
        
        optionsToCreate.forEach(option => {
          this.optionService.createOption(option).subscribe(
            (createdOption: Option) => {
              if (!this.optionsMap[question.id]) {
                this.optionsMap[question.id] = [];
              }
              this.optionsMap[question.id].push(createdOption);
            },
            (error) => {
              console.error('Erreur lors de la création de l\'option', error);
            }
          );
        });

        this.questions.push(question);
        this.addingQuestion = false;
        this.newQuestionText = '';
        this.newOptions = [
          { text: '', correct: false },
          { text: '', correct: false },
          { text: '', correct: false },
          { text: '', correct: false }
        ];
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la nouvelle question', error);
      }
    );
  }

  removeQuestion(index: number): void {
    const questionId = this.questions[index].id;
    this.questionService.deleteQuestion(questionId).subscribe(
      () => {
        this.questions.splice(index, 1);
        delete this.optionsMap[questionId];
      },
      (error) => {
        console.error('Erreur lors de la suppression de la question', error);
      }
    );
  }


}
