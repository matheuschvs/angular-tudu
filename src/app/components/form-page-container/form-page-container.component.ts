import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tudu-form-page-container',
  templateUrl: './form-page-container.component.html',
  styleUrls: ['./form-page-container.component.scss']
})
export class FormPageContainerComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {
  }

}
