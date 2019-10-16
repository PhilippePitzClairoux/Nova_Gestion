import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  @Input () client: any;

  @Output () done = new EventEmitter<any>();
  @Output () cancel = new EventEmitter<any>();

  constructor() { }

  public ngOnInit(): void {
  }

  public onDone(): void {
    this.done.emit();
  }

  public onCancel(): void {
    this.cancel.emit();
  }

}
