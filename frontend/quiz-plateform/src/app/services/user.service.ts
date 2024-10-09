import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import baseUrl from './helper';
export interface ResetPasswordResponse {
  message: string;
}


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  public registerUser(user: User, cvFile: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('cv', cvFile);
    formData.append('user', JSON.stringify(user));

    return this.http.post<User>(`${baseUrl}/register`, formData);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}/users/user/${id}`);
  }

  public updateUserInfo(id: number, user: User, file?: File): Observable<User> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (file) {
      formData.append('cv', file);
    }
    return this.http.put<User>(`${baseUrl}/users/${id}/update-info`, formData);
  }
  public updatePassword(id: number, newPassword: string): Observable<any> {
    const payload = { newPassword };
    return this.http.post<any>(`${baseUrl}/users/${id}/update-password`, payload);
  }
  
  
  
  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/users/user/${id}`);
  }

  public findByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/users/user/username/${username}`);
  }

  public findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/users/user/email/${email}`);
  }
  
  resetPassword(email: string): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(`${baseUrl}/reset-password`, { email }, { responseType: 'text' as 'json' });
  }
}
