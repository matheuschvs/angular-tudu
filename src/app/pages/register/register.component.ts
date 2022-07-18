import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tudu-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title = 'Cadastrar'

  constructor() {}

  ngOnInit(): void {
  }

}
