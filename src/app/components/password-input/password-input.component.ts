import { Component, Input, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'tudu-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  hidden = true;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  hasFocus = false;

  constructor() {}

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.hidden = !this.hidden;
  }

  setFocus(focus: boolean) {
    this.hasFocus = focus;
  }
}
