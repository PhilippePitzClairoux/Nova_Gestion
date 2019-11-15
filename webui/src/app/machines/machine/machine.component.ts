import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Machine} from '../../models/machine';
import {MachineService} from '../../services/machine.service';
import {StatusService} from '../../services/status.service';
import {Status} from '../../models/status';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  private id: any;
  machine: Machine;
  machineForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private machineService: MachineService,
              private router: Router) {
  }

  ngOnInit() {
    this.initializeForm();
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getMachine();
    });
  }

  getMachine() {
    this.machineService.getOne(this.id).subscribe(res => {
      this.machine = res;
      this.setValues();
    });
  }

  private setValues() {
    this.machineForm.controls.name.setValue(this.machine.name);
    this.machineForm.controls.acquisitionDate.setValue(new Date(this.machine.acquisitionDate));
    this.machineForm.controls.model.setValue(this.machine.model.name);
    this.machineForm.controls.serialNumber.setValue(this.machine.serialNumber);
  }

  cancel() {
    this.router.navigate(['machines']);
  }

  private initializeForm() {
    this.machineForm = new FormGroup({
      serialNumber: new FormControl('', Validators.maxLength(254)),
      name: new FormControl('', [Validators.required, Validators.maxLength(254)]),
      acquisitionDate: new FormControl('', Validators.required),
      model: new FormControl('', [Validators.required, Validators.maxLength(254)]),
    });
  }

  save() {
    let newMachine: Machine;
    newMachine = this.machine;
    if (this.machineForm.valid) {
      if (this.machineForm.dirty) {
        this.createMachine(newMachine);
        this.update(newMachine);
      }
    } else {
      this.validateAllFields(this.machineForm);
    }
  }

  private createMachine(newMachine: Machine) {
    const controls = this.machineForm.controls;

    newMachine.idMachine = this.id;

    newMachine.name = controls.name.value;
    newMachine.acquisitionDate = controls.acquisitionDate.value;
    newMachine.serialNumber = controls.serialNumber.value;
    newMachine.model.name = controls.model.value;
  }

  private validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  private update(newMachine: Machine) {
    this.machineService.update(newMachine).subscribe(res => {
      this.router.navigate(['machines']);
    });
  }
}
