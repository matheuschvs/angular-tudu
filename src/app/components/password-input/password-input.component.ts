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
  @Input() hidden: boolean = true;
  @Input() hasFocus: boolean = false;
  @Input() togglePasswordVisibility: () => void;
  @Input() setFocus: (focus: any) => void;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;

  constructor() {}

  ngOnInit(): void {
  }
}
