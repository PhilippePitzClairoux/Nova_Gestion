import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Tool} from '../../../models/tool';
import {Client} from '../../../models/client';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  clients: Client[] = [
    {
      id: 1,
      name: 'Kappa',
      phoneNumber: '1231231234'
    },
    {
      id: 2,
      name: 'monkaS',
      phoneNumber: '1231231234'
    },
    {
      id: 3,
      name: 'peepoSad',
      phoneNumber: '1231231234'
    }];

  constructor(
    public dialogRef: MatDialogRef<ToolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tool) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
