import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Todo } from '../models/todo.model'
import { TUDU_API } from "../app.api";
import { LoginService } from "./login.service";

@Injectable()
export class HomeService {
  headers = new HttpHeaders()

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    if (this.loginService.isLoggedIn()) {
      this.headers = this.headers.set('Authorization', 'Bearer ' + this.loginService.token)
    }
  }

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${TUDU_API}/todos`, { headers: this.headers })
  }

  toggleTodoStatus(id: string, status: string): Observable<Todo> {
    const newStatus = status === 'WAITING' ? 'DONE' : 'WAITING';
    return this.http.put<Todo>(`${TUDU_API}/todos/${id}`, {
      todo: { status: newStatus }
    }, { headers: this.headers })
  }
}
