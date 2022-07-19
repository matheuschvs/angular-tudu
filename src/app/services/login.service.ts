import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from "rxjs";

import { TUDU_API } from '../app.api';

interface IResponse {
  user: User;
  token: string;
}

type User = {
  _id: ObjectId;
  name: string;
  email: string;
  password_digest: string;
  created_at: Date;
  updated_at: Date;
  categories?: Category[];
}

type Category = {
  _id: ObjectId;
  title: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}

type ObjectId = {
  $oid: string;
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
