import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Todo } from '../models/todo.model'
import { TUDU_API } from "../app.api";
import { LoginService } from "./login.service";
import { User } from "../models/user.model";
import { Task } from "../models/task.model";
import { Comment } from "../models/comment.model";
import { Category } from "../models/category.model";

interface ICreateTodoRequest {
  title: string;
  description: string;
  deadline: string;
  category: string;
}

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

  addTodo({ title, category, deadline, description }: ICreateTodoRequest): Observable<Todo> {
    return this.http.post<Todo>(`${TUDU_API}/todos`, {
      todo: { title, category, deadline, description }
    }, { headers: this.headers })
  }

  addMember(todo_id: string, member_id: string): Observable<Todo> {
    return this.http.post<Todo>(`${TUDU_API}/todos/${todo_id}/members`, {
      member_id
    }, { headers: this.headers })
  }

  addTask(todo_id: string, title: string): Observable<Task> {
    return this.http.post<Task>(`${TUDU_API}/todos/${todo_id}/tasks`, {
      title
    }, { headers: this.headers })
  }

  deleteTask(todo_id: string, task_id: string): Observable<null> {
    return this.http.delete<null>(`${TUDU_API}/todos/${todo_id}/tasks/${task_id}`,
      { headers: this.headers })
  }

  deleteTodo(todo_id: string): Observable<null> {
    return this.http.delete<null>(`${TUDU_API}/todos/${todo_id}`,
      { headers: this.headers })
  }

  fetchMember(id: string): Observable<User> {
    return this.http.get<User>(`${TUDU_API}/users/${id}`, { headers: this.headers })
  }

  fetchMemberByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${TUDU_API}/users?email=${email}`, { headers: this.headers })
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

  fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${TUDU_API}/categories`, { headers: this.headers })
  }

  addCategory(title: string, color: string) {
    return this.http.post<Category>(`${TUDU_API}/categories`, {
      category: {
        title,
        color
      }
    }, { headers: this.headers })
  }
}
