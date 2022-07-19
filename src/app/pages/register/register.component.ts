import { Component, OnInit } from '@angular/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'tudu-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title = 'Cadastrar'
  googleIcon = faGoogle;

  constructor() {}

  ngOnInit(): void {
  }

}
