import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import br from 'dayjs/locale/pt-br'

import { Todo } from 'src/app/models/todo.model';
import { LoginService } from 'src/app/services/login.service';
import { TodoService } from 'src/app/services/todo.service';
import { shadeColor } from 'src/app/utils/shadeColor';
import { colors } from 'src/app/demo-utils/colors';

interface IGroupedByDay {
  [key: string]: Todo[]
}

dayjs.locale({ ...br })
dayjs.extend(isSameOrAfter)

@Component({
  selector: 'tudu-planner',
  templateUrl: './planner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './planner.component.scss'
  ]
})
export class PlannerComponent implements OnInit {
  todos: Todo[]
  daysOfWeek = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
  ]
  todosAfter: Todo[]
  todoDays: Date[]
  groupByDay: IGroupedByDay
  groupByDayKeys: string[]
  dayjs = dayjs
  shadeColor = shadeColor;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(
    private _todoService: TodoService,
    private _toastService: ToastService,
    private loginService: LoginService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._todoService.fetchTodos()
      .subscribe({
        error: () => this._toastService.error('Algo deu errado'),
        next: data => {
          data.forEach((todo: any) => {
            const userCategories = this.loginService.user.categories
            const currCategory = userCategories?.find(c => c._id.$oid === todo.category_id.$oid)
            if (currCategory) {
              todo.category = currCategory
            } else {
              this._todoService.fetchCategories().subscribe({
                error: () => this._toastService.error('Categoria não encontrada'),
                next: ctgr => {
                  todo.category = ctgr.find(c => c._id.$oid === todo.category_id.$oid)
                }
              })
            }
          })

          this.todos = data;

          this.todosAfter = data?.filter(todo => dayjs(todo.deadline)
            .isSameOrAfter(dayjs(), 'day'))
          this.todoDays = this.todosAfter
            .map(todo => new Date(todo.deadline))
          this.groupByDay = this.todosAfter.reduce((acc, todo) => {
            if (!acc[todo.deadline]) {
              acc[todo.deadline] = []
            }
            acc[todo.deadline].push(todo)
            return acc
          }, {} as IGroupedByDay)
          this.groupByDayKeys = Object.keys(this.groupByDay)

          this.events = this.todosAfter.map(todo => {
            return {
              start: new Date(todo.deadline),
              title: todo.title,
              color: { primary: todo.category?.color, secondary: todo.category?.color }
            }
          })

          this.changeDetector.detectChanges();
        }
      })
  }

}
