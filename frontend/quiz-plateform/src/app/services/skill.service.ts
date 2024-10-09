import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${baseUrl}/skills`);
  }

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${baseUrl}/skills`, skill);
  }

  getSkillByName(skillname: string): Observable<Skill | null> {
    return this.http.get<Skill>(`${baseUrl}/skills/${skillname}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of(null); // Return null if the skill is not found
        }
        return throwError(() => error); // Rethrow other errors
      })
    );
  }
}
