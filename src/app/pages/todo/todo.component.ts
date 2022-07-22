import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'angular-toastify';
import { faArrowLeft, faEllipsis, faTag, faPlus, faPaperclip, faArrowRight, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';


import { ObjectId } from 'src/app/models/object-id.model';
import { Todo } from 'src/app/models/todo.model';
import { LoginService } from 'src/app/services/login.service';
import { TodoService } from 'src/app/services/todo.service';
import { shadeColor } from 'src/app/utils/shadeColor';

@Component({
  selector: 'tudu-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  leftArrowIcon = faArrowLeft;
  dotsIcon = faEllipsis;
  calendarIcon = faCalendar;
  tagIcon = faTag;
  plusIcon = faPlus;
  clipIcon = faPaperclip;
  rightArrowIcon = faArrowRight;
  paperPlaneIcon = faPaperPlane;
  trashIcon = faTrash;
  shadeColor = shadeColor;
  comment: string = '';
  todo: Todo;
  task: string = '';

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private _toastService: ToastService,
    private loginService: LoginService,
    private _location: Location,
    private offcanvasService: NgbOffcanvas,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.updateTodo();
  }

  updateTodo(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';

    this.todoService
      .fetchTodo(id)
      .subscribe({
        error: () => this._toastService.error('Não foi possível encontrar o todo'),
        next: (data: any) => {
          const userCategories = this.loginService.user.categories
          const currCategory = userCategories?.find(c => c._id.$oid === data.category_id.$oid)
          if (currCategory) {
            data.category = currCategory
          } else {
            this.todoService.fetchCategories().subscribe({
              error: () => this._toastService.error('Categoria não encontrada'),
              next: ctgr => {
                data.category = ctgr.find(c => c._id.$oid === data.category_id.$oid)
              }
            })
          }

          data.members = []

          data.member_ids.forEach((member: ObjectId) => {
            this.todoService
              .fetchMember(member.$oid).subscribe({
                error: () => this._toastService.error('Algum dos membros não foi encontrado'),
                next: currMember => data.members.push(currMember)
              })
          })

          this.todo = data;
        }
      })
  }

  goBack() {
    this._location.back();
  }

  handleAddTask() {
    this.todoService.addTask(this.todo._id.$oid, this.task).subscribe({
      error: () => this._toastService.error('Não foi possível adicionar uma das sub-tarefas'),
      next: data => {
        if (!this.todo.tasks) {
          this.todo.tasks = []
        }
        this.todo.tasks.push(data)
      }
    })
  }

  handleDeleteTask(task_id: string) {
    this.todoService.deleteTask(this.todo._id.$oid, task_id).subscribe({
      error: () => this._toastService.error('Não foi possível remover a sub-tarefa'),
      next: () => {
        this.updateTodo()
      }
    })
  }

  handleDeleteTodo() {
    this.todoService.deleteTodo(this.todo._id.$oid).subscribe({
      error: () => this._toastService.error('Não foi possível remover a tarefa'),
      next: () => {
        this._toastService.success('Tarefa removida com sucesso')
        this._router.navigate(['/home'])
      }
    })
  }

  handleToggleTaskStatus(todo_id: string, task_id: string, status: string) {
    this.todoService.toggleTaskStatus(todo_id, task_id, status).subscribe({
      error: () => this._toastService.error('Não foi possível alterar'),
      next: () => this.updateTodo()
    })
  }

  onSubmitComment(id: string, comment: string) {
    this.todoService.addComment(id, comment).subscribe({
      error: () => this._toastService.error('Não foi possível enviar o comentário'),
      next: () => {
        this.comment = ''
        this.updateTodo()
      }
    })
  }

  open(content: any) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' });
  }
}
