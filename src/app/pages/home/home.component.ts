import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';

import { Todo } from 'src/app/models/todo.model';
import { LoginService } from 'src/app/services/login.service';
import { TodoService } from 'src/app/services/todo.service';
import { shadeColor } from '../../utils/shadeColor'

@Component({
  selector: 'tudu-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent implements OnInit {
  todos: Todo[]
  shadeColor = shadeColor;

  constructor(
    private todoService: TodoService,
    private _toastService: ToastService,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.updateTodos();
  }

  updateTodos() {
    this.todoService
      .fetchTodos()
      .subscribe({
        error: () => this._toastService.error('Algo deu errado'),
        next: data => {
          data.forEach((todo: any) => {
            const userCategories = this.loginService.user.categories
            const currCategory = userCategories?.find(c => c._id.$oid === todo.category_id.$oid)
            if (currCategory) {
              todo.category = currCategory
            }
          })

          this.todos = data;
        }
      })
  }

  handleToggleStatus(id: string, status: string): void {
    this.todoService
      .toggleTodoStatus(id, status)
      .subscribe({
        error: () => this._toastService.error('Não foi possível alterar'),
        next: () => this.updateTodos()
      })
  }

  filterTodos(status: string, index: number = this.todos?.length || 0) {
    return this.todos
      ?.filter(todo => todo.status === status)
      .filter((t, i) => i < index)
  }

  addTodosPercent(todos: Todo[]): Todo[] {
    return todos?.map(todo => {
      const completedTasksNumber = todo.tasks?.filter(t => t.status === "DONE").length
      const percentNumber = (completedTasksNumber ?? 1) / (todo.tasks?.length || 1)
      const percentString = this.numberToPercent(percentNumber)

      todo.percent = percentString
      return todo
    }).sort((a, b) => !a.percent > !b.percent ? -1 : 1)
  }

  private numberToPercent(value: number) {
    return Intl.NumberFormat('pt-BR', {
      style: 'percent',
      maximumFractionDigits: 0
    }).format(value)
  }
}
