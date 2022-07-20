import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';

import { Todo } from 'src/app/models/todo.model';
import { HomeService } from 'src/app/services/home.service';
import { LoginService } from 'src/app/services/login.service';
import { shadeColor } from '../../utils/shadeColor'

@Component({
  selector: 'tudu-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  todos: Todo[]
  shadeColor = shadeColor;

  constructor(
    private homeService: HomeService,
    private _toastService: ToastService,
    private loginService: LoginService
  ) {
    this.updateTodos();
  }

  ngOnInit(): void {
  }

  updateTodos() {
    this.homeService
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
    this.homeService
      .toggleTodoStatus(id, status)
      .subscribe({
        error: () => this._toastService.error('Não foi possível alterar'),
        next: () => this.updateTodos()
      })
  }

  filterTodos(status: string, index: number = this.todos?.length || 0) {
    console.log(index)
    return this.todos?.filter((todo, i) => todo.status === status && i < index)
  }

  addTodosPercent(todos: Todo[]): Todo[] {
    return todos?.map(todo => {
      const completedTasksNumber = todo.tasks?.filter(t => t.status === "DONE").length
      const percentNumber = completedTasksNumber || 1 / (todo.tasks?.length || 1)
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
