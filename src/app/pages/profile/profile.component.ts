import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'tudu-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userIcon = faUser;
  powerIcon = faPowerOff;
  user: User;

  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.user = this._loginService.user;
  }

  handleLogout() {
    localStorage.clear()
    this._router.navigate(['/'])
  }
}
