import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Tool} from '../../../models/tool';
import {Client} from '../../../models/client';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  clients: Client[] = [];
  toolForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ToolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tool,
    private clientService: ClientService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getClients();
    this.toolForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.max(254)]),
      stockQuantity: new FormControl('', Validators.required),
      minimumQuantity: new FormControl('', Validators.required),
      client: new FormControl('', Validators.required),
    });

    if (this.data) {
      this.toolForm.controls.name.setValue(this.data.name);
      this.toolForm.controls.stockQuantity.setValue(this.data.stockQuantity);
      this.toolForm.controls.minimumQuantity.setValue(this.data.minimumQuantity);
      this.data.client ? this.toolForm.controls.client.setValue(this.data.client.idClient) : this.toolForm.controls.client.setValue('');
    }
  }

  close() {
    let tool = new Tool();
    if (this.toolForm.valid) {
      if (this.toolForm.dirty) {
        tool = this.createTool(tool);
      } else {
        tool = this.data;
      }
      this.dialogRef.close(tool);
    }
  }

  private createTool(tool: Tool): Tool {
    const controls = this.toolForm.controls;
    if (this.data) {
      tool.idTool = this.data.idTool;
    }
    tool.name = controls.name.value;
    tool.stockQuantity = controls.stockQuantity.value;
    tool.minimumQuantity = controls.minimumQuantity.value;
    tool.client = controls.client.value;
    return tool;
  }

  private getClients() {
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
    });
  }
}
