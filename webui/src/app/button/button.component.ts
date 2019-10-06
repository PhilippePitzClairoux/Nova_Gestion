import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() style: string;
  @Output() clicked = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onButtonClick(event: MouseEvent) {
    this.clicked.emit(event);
  }
}
