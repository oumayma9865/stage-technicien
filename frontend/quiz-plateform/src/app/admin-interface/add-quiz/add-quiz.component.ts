import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SidebaradminComponent } from '../sidebar-admin/sidebar-admin.component';
import { NavbaradminComponent } from '../navbar-admin/navbar-admin.component';
import { Question } from '../../models/question';
import { Quiz } from '../../models/quiz';
import { Skill } from '../../models/skill';
import { Option } from '../../models/option';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { OptionService } from '../../services/option.service';
import { SkillService } from '../../services/skill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbaradminComponent, SidebaradminComponent],
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddquizComponent {
  quizTitle: string = '';
  domain: string = '';
  score: number = 0;
  time: string = '';
  skill: Skill = { id: 0, skill: '' };
  difficulty: string = '';
  questions: Question[] = [{
    id: 0,
    question: '',
    options: [
      { id: 0, texte: '', correct: false, question: {} as Question },
      { id: 0, texte: '', correct: false, question: {} as Question },
      { id: 0, texte: '', correct: false, question: {} as Question },
      { id: 0, texte: '', correct: false, question: {} as Question }
    ],
    type: '',
    quiz: {} as Quiz
  }];
 
  
  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private optionService: OptionService,
    private skillService: SkillService,
    private router: Router
  ) {}

  addQuestion(): void {
    this.questions.push({
      id: 0,
      question: '',
      options: [
        { id: 0, texte: '', correct: false, question: {} as Question },
        { id: 0, texte: '', correct: false, question: {} as Question },
        { id: 0, texte: '', correct: false, question: {} as Question },
        { id: 0, texte: '', correct: false, question: {} as Question }
      ],
      type: '',
      quiz: {} as Quiz
    });
  }

  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  submitQuiz(form: NgForm): void {
    if (form.invalid) {
      return;
    }
  
    this.skillService.getSkillByName(this.skill.skill).subscribe(
      (existingSkill) => {
        if (existingSkill) {
          this.processQuizCreation(existingSkill);
        } else {
          const skill: Skill = {
            id: 0,
            skill: this.skill.skill
          };
  
          this.skillService.addSkill(skill).subscribe(
            (createdSkill) => {
              this.processQuizCreation(createdSkill);
            },
            (error) => {
              console.error('Error creating skill', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching skill', error);
      }
    );
  }

  processQuizCreation(skill: Skill): void {
    const quiz: Quiz = {
      id: 0,
      titre: this.quizTitle,
      domaine: this.domain,
      difficulte: this.difficulty,
      score: this.score,
      temps: this.time,
      skill: skill,
      questions: []
    };

    this.quizService.createQuiz(quiz).subscribe(
      (createdQuiz) => {
        this.questions.forEach((question, questionIndex) => {
          question.quiz = createdQuiz;
          
          // Determine the type based on the number of correct options
          const correctOptionsCount = question.options.filter(option => option.correct).length;
          question.type = correctOptionsCount === 1 ? 'choix unique' : 'choix multiple';

          this.questionService.createQuestion(question).subscribe(
            (createdQuestion) => {
              if (createdQuestion) {
                question.options.forEach((option, optionIndex) => {
                  option.question = createdQuestion;
                  this.optionService.createOption(option).subscribe(
                    (createdOption) => {
                      console.log(`Option ${optionIndex + 1} for question ${questionIndex + 1} created successfully`, createdOption);
                    },
                    (error) => {
                      console.error('Error creating option', error);
                    }
                  );
                });
              } else {
                console.error(`Created question is undefined at index ${questionIndex}`);
              }
            },
            (error) => {
              console.error('Error creating question', error);
            }
          );
        });
        this.router.navigate(['/quizhome']);
      },
      (error) => {
        console.error('Error creating quiz', error);
      }
    );
  }
}
