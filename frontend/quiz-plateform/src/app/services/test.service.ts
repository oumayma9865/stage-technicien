import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/test';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${baseUrl}/api/tests`);
  }

  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${baseUrl}/api/tests/${id}`);
  }

  createTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${baseUrl}/api/tests`, test);
  }

  updateTest(id: number, test: Test): Observable<Test> {
    return this.http.put<Test>(`${baseUrl}/api/tests/${id}`, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/api/tests/${id}`);
  }

  getTestByTitre(titre: string): Observable<Test> {
    return this.http.get<Test>(`${baseUrl}/api/tests/titre/${titre}`);
  }
}
