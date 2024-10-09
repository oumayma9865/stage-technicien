import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { Option } from '../models/option';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private optionsUrl = `${baseUrl}/options`;

  constructor(private http: HttpClient) { }

  getOptionsByQuestion(questionId: number): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.optionsUrl}/question/${questionId}`);
  }

  getOptionById(id: number): Observable<Option> {
    return this.http.get<Option>(`${this.optionsUrl}/${id}`);
  }

  createOption(option: Option): Observable<Option> {
    return this.http.post<Option>(this.optionsUrl, option);
  }

  updateOption(id: number, option: Option): Observable<Option> {
    return this.http.put<Option>(`${this.optionsUrl}/${id}`, option);
  }

  deleteOption(id: number): Observable<void> {
    return this.http.delete<void>(`${this.optionsUrl}/${id}`);
  }
}
