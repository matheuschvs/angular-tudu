import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'tudu-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  title = 'Cadastrar'
  googleIcon = faGoogle;
  passHidden = true;
  passHasFocus = false;
  passTogglePasswordVisibility = () => this.passHidden = !this.passHidden;
  passSetFocus = (focus: any) => this.passHasFocus = focus;
  confHidden = true;
  confHasFocus = false;
  confTogglePasswordVisibility = () => this.confHidden = !this.confHidden;
  confSetFocus = (focus: any) => this.confHasFocus = focus;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    const { name, email, password, passwordConfirmation } = form.value

    if (password === passwordConfirmation) {
      this.registerService
        .register(name, email, password)
        .subscribe()

      this.router.navigate(['/login'])
    }
  }
}
