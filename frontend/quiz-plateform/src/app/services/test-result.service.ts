import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';
import { TestResult } from '../models/testResult';

@Injectable({
  providedIn: 'root'
})
export class TestResultService {

  constructor(private http: HttpClient) { }

  getTestResultById(id: number): Observable<TestResult> {
    return this.http.get<TestResult>(`${baseUrl}/test-results/${id}`);
  }

  createTestResult(testResult: TestResult): Observable<TestResult> {
    return this.http.post<TestResult>(`${baseUrl}/test-results`, testResult);
  }

  getTestResultsByTest(testId: number): Observable<TestResult[]> {
    return this.http.get<TestResult[]>(`${baseUrl}/test-results/test/${testId}`);
  }
}