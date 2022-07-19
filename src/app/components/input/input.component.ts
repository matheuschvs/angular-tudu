import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tudu-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() id: string;

  constructor() {}

  ngOnInit(): void {
  }

}
