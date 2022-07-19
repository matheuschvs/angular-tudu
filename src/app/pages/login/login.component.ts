import { Component, OnInit } from '@angular/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'tudu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Entrar';
  googleIcon = faGoogle;
  hidden = true;
  hasFocus = false;
  togglePasswordVisibility = () => this.hidden = !this.hidden;
  setFocus = (focus: any) => this.hasFocus = focus;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    const { email, password } = form.value

    this.loginService
      .login(email, password)
      .subscribe(data => console.log(data))
  }
}
