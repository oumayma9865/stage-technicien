import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${baseUrl}/quizzes`);
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${baseUrl}/quizzes/${id}`);
  }

  getQuizzesByTest(testId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${baseUrl}/quizzes/test/${testId}`);
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${baseUrl}/quizzes`, quiz);
  }

  updateQuiz(id: number, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${baseUrl}/quizzes/${id}`, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/quizzes/${id}`);
  }

  getQuizByTitre(titre: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${baseUrl}/quizzes/titre/${titre}`);
  }
}
