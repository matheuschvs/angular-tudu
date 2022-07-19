import { Component, OnInit } from '@angular/core';
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'tudu-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  houseIcon = faHouse;
  calendarIcon = faCalendar;
  userIcon = faUser;
  plusIcon = faPlus;

  constructor() {
  }

  ngOnInit(): void {
  }

}
