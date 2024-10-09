import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebaradminComponent } from '../sidebar-admin/sidebar-admin.component';
import { NavbaradminComponent } from '../navbar-admin/navbar-admin.component';
import { Router, RouterLink } from '@angular/router';
import { Quiz } from '../../models/quiz';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quiz-home',
  standalone: true,
  imports: [SidebaradminComponent,NavbaradminComponent,CommonModule,RouterLink,FormsModule],
  templateUrl: './quiz-home.component.html',
  styleUrl: './quiz-home.component.css'
})
export class QuizhomeComponent {
  quizzes: Quiz[] = [];
  filteredQuizzes: Quiz[] = [];
  searchTerm: string = '';
  

  constructor(private quizService: QuizService,private router:Router) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
        this.filteredQuizzes = data;
      },
      error => {
        console.error('Error loading quizzes', error);
      }
    );
  }

  searchQuizzes(): void {
    if (this.searchTerm) {
      this.filteredQuizzes = this.quizzes.filter(quiz =>
        quiz.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredQuizzes = this.quizzes;
    }
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.filteredQuizzes = this.quizzes;
  }

  deleteQuiz(id: number): void {
    this.quizService.deleteQuiz(id).subscribe(
      () => {
        this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
        this.filteredQuizzes = this.quizzes;
        const deletedQuiz = this.quizzes.find(quiz => quiz.id !== id);
        Swal.fire(
          'Succés',
          `Le quiz est supprimé avec succés `
           ,'success'
        );
      },
      error => {
        console.error('Error deleting quiz', error);
      }
    );
  }
  viewQuizDetails(id: number): void {
    this.router.navigate(['/quizdetails', id]);
  }

  
}