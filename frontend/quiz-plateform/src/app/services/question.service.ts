import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionsUrl = `${baseUrl}/questions`;

  constructor(private http: HttpClient) { }

  getQuestionsByQuiz(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionsUrl}/quiz/${quizId}`);
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.questionsUrl}/${id}`);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question);
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.questionsUrl}/${id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.questionsUrl}/${id}`);
  }
}
