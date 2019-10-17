import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef} from '@angular/material';
import {Blank} from '../../../models/blank';
import {CoolantHoleTypeService} from '../../../services/coolant-hole-type.service';
import {GradeService} from '../../../services/grade.service';
import {Grade} from '../../../models/grade';
import {CoolantHoleType} from '../../../models/coolant-hole-type';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

  grades: Grade[] = [];
  types: CoolantHoleType[] = [];
  blankForm: FormGroup;
  hasCoolantHole = false;

  constructor(
    public dialogRef: MatDialogRef<BlankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Blank,
    private coTypeService: CoolantHoleTypeService,
    private gradeService: GradeService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.blankForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.max(254)]),
      stockQuantity: new FormControl('', Validators.required),
      minimumQuantity: new FormControl('', Validators.required),
      diameter: new FormControl('', Validators.required),
      length: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      coolantHoleType: new FormControl(''),
      holeDiameter: new FormControl(''),
      holesNumber: new FormControl('')
    });
    this.getGrades();
  }

  close() {
    let blank = new Blank();
    if (this.blankForm.valid) {
      if (this.blankForm.dirty) {
        this.createBlank(blank);
      } else {
        blank = this.data;
      }
      this.dialogRef.close(blank);
    } else {
      this.validateAllFields(this.blankForm);
    }
  }

  private createBlank(blank: Blank): Blank {
    const controls = this.blankForm.controls;
    if (this.data) {
      blank.idBlank = this.data.idBlank;
    }
    blank.name = controls.name.value;
    blank.stockQuantity = controls.stockQuantity.value;
    blank.minimumQuantity = controls.minimumQuantity.value;
    blank.grade = controls.grade.value;
    blank.coolantHole = controls.coolantHole.value;
    return blank;
  }

  private getGrades() {
    this.gradeService.getAll().subscribe(grades => {
      this.grades = grades;
      console.log(grades);
      this.getCoolantHoleTypes();
    });
  }

  private getCoolantHoleTypes() {
    this.coTypeService.getAll().subscribe(types => {
      this.types = types;
      this.setValues();
    });
  }

  private setValues() {
    if (this.data) {
      this.blankForm.controls.name.setValue(this.data.name);
      this.blankForm.controls.stockQuantity.setValue(this.data.stockQuantity);
      this.blankForm.controls.minimumQuantity.setValue(this.data.minimumQuantity);
    }
  }

  private setGrade() {
    const grade = this.grades.filter(x => x.code === this.data.grade.code)[0];
    this.blankForm.controls.grade.setValue(grade);
  }

  private setCoolantHoleType() {
    const type = this.types.filter(x => x.idTypeCoolantHole === this.data.coolantHole.type.idTypeCoolantHole)[0];
    this.blankForm.controls.client.setValue(type);
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

  showCoolantHoleOptions($event: MatCheckboxChange) {
    this.hasCoolantHole = !this.hasCoolantHole;

    if (this.hasCoolantHole) {
      this.blankForm.controls.holesNumber.setValidators([Validators.required]);
      this.blankForm.controls.holeDiameter.setValidators([Validators.required]);
      this.blankForm.controls.coolantHoleType.setValidators([Validators.required]);
    } else {
      this.blankForm.controls.holesNumber.clearValidators();
      this.blankForm.controls.holeDiameter.clearValidators();
      this.blankForm.controls.coolantHoleType.clearValidators();
    }
  }
}
