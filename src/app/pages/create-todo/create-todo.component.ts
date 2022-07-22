import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faChevronRight, faMinus, faPaperclip, faPlus, faTag, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'angular-toastify';
import { Category } from 'src/app/models/category.model';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'tudu-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  calendarIcon = faCalendar;
  tagIcon = faTag;
  usersIcon = faUserGroup;
  chevronRightIcon = faChevronRight;
  plusIcon = faPlus;
  minusIcon = faMinus;
  clipIcon = faPaperclip;
  rightArrowIcon = faArrowRight;
  model: NgbDateStruct;
  categories: Category[];
  member: string = '';
  members: string[] = [];
  isNewCategoryShown: boolean = false;
  color: string;
  newCategory: string;
  task: string = '';
  tasks: string[] = [];

  constructor(
    private _todoService: TodoService,
    private _toastService: ToastService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._todoService.fetchCategories().subscribe({
      next: data => this.categories = data,
      error: () => this._toastService.error('Não foi possível carregar as categorias')
    })
  }

  handleCreateTodo(form: any) {
    const {
      title: { value: title },
      description: { value: description },
      deadline: { value: { year, month, day } },
      category: { value: category },
    } = form.form.controls;
    const deadline = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`

    this._todoService.addTodo(
      { title, description, deadline, category }
    ).subscribe({
      error: () => this._toastService.error('Não foi possível criar a tarefa'),
      next: (todo: Todo) => {
        this.members.forEach(member => {
          this._todoService.addMember(todo._id.$oid, member).subscribe({
            error: () => this._toastService.error('Não foi possível adicionar um dos usuários')
          })
        })

        this.tasks.forEach(task => {
          this._todoService.addTask(todo._id.$oid, task).subscribe({
            error: () => this._toastService.error('Não foi possível adicionar uma das sub-tarefas')
          })
        })

        this._router.navigate(['/todos/' + todo._id.$oid])
      }
    })
  }

  handleToggleNewCategory() {
    this.isNewCategoryShown = !this.isNewCategoryShown
  }

  handleAddCategory() {
    this._todoService.addCategory(this.newCategory, this.color).subscribe({
      error: () => this._toastService.error('Não foi possível criar a categoria'),
      next: () => {
        this._toastService.success('Categoria criada com sucesso')
        this._todoService.fetchCategories().subscribe({
          next: data => {
            this.categories = data
            this.isNewCategoryShown = false
            this.color = '';
            this.newCategory = '';
          }
        })
      }
    })
  }

  handleAddTask() {
    if (this.task) {
      this.tasks.push(this.task)
      this.task = ''
    }
  }

  handleAddMember() {
    this._todoService.fetchMemberByEmail(this.member).subscribe({
      error: () => this._toastService.error('Usuário não encontrado'),
      next: data => {
        this.members.push(data._id.$oid)
        this._toastService.success('Usuário adicionado')
      }
    })
  }
}
