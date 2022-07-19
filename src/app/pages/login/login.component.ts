import { Component, OnInit } from '@angular/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'tudu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Entrar';
  googleIcon = faGoogle;

  constructor() {}

  ngOnInit(): void {
  }

}
