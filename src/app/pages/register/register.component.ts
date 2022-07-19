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
  passHidden = true;
  passHasFocus = false;
  passTogglePasswordVisibility = () => this.passHidden = !this.passHidden;
  passSetFocus = (focus: any) => this.passHasFocus = focus;
  confHidden = true;
  confHasFocus = false;
  confTogglePasswordVisibility = () => this.confHidden = !this.confHidden;
  confSetFocus = (focus: any) => this.confHasFocus = focus;

  constructor() {}

  ngOnInit(): void {
  }

}
