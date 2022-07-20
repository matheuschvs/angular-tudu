import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ToastService } from 'angular-toastify';

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

  constructor(
    private loginService: LoginService,
    private _toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    const { email, password } = form.value

    this.loginService
      .login(email, password)
      .subscribe({
        error: () => this._toastService.error('Algo deu errado, tente novamente'),
        next: () => {
          this.router.navigate(['/home'])
        }
      })
  }
}
