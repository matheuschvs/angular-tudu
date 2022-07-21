import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Todo } from '../models/todo.model'
import { TUDU_API } from "../app.api";
import { LoginService } from "./login.service";
import { User } from "../models/user.model";
import { Task } from "../models/task.model";
import { Comment } from "../models/comment.model";

@Injectable()
export class TodoService {
  headers = new HttpHeaders()

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    if (this.loginService.isLoggedIn()) {
      this.headers = this.headers.set('Authorization', 'Bearer ' + this.loginService.token)
    }
  }

  fetchMember(id: string): Observable<User> {
    return this.http.get<User>(`${TUDU_API}/users/${id}`, { headers: this.headers })
  }

  fetchTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${TUDU_API}/todos/${id}`, { headers: this.headers })
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

  toggleTaskStatus(todo_id: string, task_id: string, status: string) {
    const newStatus = status === 'WAITING' ? 'DONE' : 'WAITING';
    return this.http.put<Task>(`${TUDU_API}/todos/${todo_id}/tasks/${task_id}`, {
      status: newStatus
    }, { headers: this.headers })
  }

  addComment(id: string, comment: string) {
    return this.http.post<Comment>(`${TUDU_API}/todos/${id}/comments`, {
      comment: { comment }
    }, { headers: this.headers })
  }
}
