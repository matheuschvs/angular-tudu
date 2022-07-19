import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from "rxjs";

import { TUDU_API } from '../app.api';
import { User } from "../models/user.model";

interface IResponse {
  user: User;
  token: string;
}

@Injectable()
export class LoginService {
  user: User;
  token: string;
  isLoggedIn(): boolean {
    return !!this.user
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${TUDU_API}/sessions`, {
      email,
      password
    }).pipe(tap(result => {
      this.token = result.token;
      this.user = result.user
    }))
  }
}
