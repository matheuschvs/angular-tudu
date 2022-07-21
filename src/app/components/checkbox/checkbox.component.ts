import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { shadeColor } from '../../utils/shadeColor'

@Component({
  selector: 'tudu-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() status: string;
  @Input() bgColor: string = 'blue';
  @Input() borderColor: string = 'white';
  @Output() userClicked: EventEmitter<any> = new EventEmitter();
  checkIcon = faCheck;
  shadeColor = shadeColor;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleStatus() {
    this.userClicked.emit();
    // this.status = this.status === 'WAITING' ? 'DONE' : 'WAITING'
  }
}
