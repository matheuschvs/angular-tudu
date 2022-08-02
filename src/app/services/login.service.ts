import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from "rxjs";

import { TUDU_API } from '../app.api';
import { User } from "../models/user.model";
import { Category } from "../models/category.model";

interface IResponse {
  user: User;
  token: string;
}

@Injectable()
export class LoginService {
  user: User = JSON.parse(localStorage.getItem('@tudu:user') || '{}');
  token: string = localStorage.getItem('@tudu:token') || '';

  isLoggedIn(): boolean {
    return !!this.user
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${TUDU_API}/sessions`, {
      email,
      password
    }).pipe(tap(result => {
      localStorage.setItem('@tudu:token', result.token)
      localStorage.setItem('@tudu:user', JSON.stringify(result.user))
      this.token = result.token;
      this.user = result.user
    }))
  }

  logout() {
    localStorage.clear()
    this.user = {} as User;
    this.token = '';
  }
}
