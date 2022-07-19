import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TUDU_API } from "../app.api";

import { User } from "../models/user.model";

@Injectable()
export class RegisterService {
  constructor(
    private http: HttpClient
  ) {}

  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(`${TUDU_API}/users`, {
      user: {
        name,
        email,
        password
      }
    })
  }
}
