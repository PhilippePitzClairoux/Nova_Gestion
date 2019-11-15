import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef} from '@angular/material';
import {Blank} from '../../../models/blank';
import {CoolantHoleTypeService} from '../../../services/coolant-hole-type.service';
import {GradeService} from '../../../services/grade.service';
import {Grade} from '../../../models/grade';
import {CoolantHoleType} from '../../../models/coolant-hole-type';
import {CoolantHole} from '../../../models/coolant-hole';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

  diameter = '';
  length = '';
  grade = '';
  coolantHole = '';

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
      name: new FormControl('', [Validators.required, Validators.maxLength(254)]),
      stockQuantity: new FormControl('', Validators.required),
      minimumQuantity: new FormControl('', Validators.required),
      diameter: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      length: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      grade: new FormControl('', Validators.required),
      coolantHoleType: new FormControl(''),
      holeDiameter: new FormControl(''),
      holesNumber: new FormControl('')
    });
    this.getGrades();
    this.inputChanges();
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
    blank.length = controls.length.value;
    blank.diameter = controls.diameter.value;
    blank.grade = controls.grade.value;

    if (this.hasCoolantHole) {
      blank.coolantHole = this.createCoolantHole();
    } else {
      blank.coolantHole = null;
    }

    return blank;
  }

  private createCoolantHole(): CoolantHole {
    const co = new CoolantHole();
    co.typeCoolantHole = this.blankForm.controls.coolantHoleType.value;
    co.quantity = this.blankForm.controls.holesNumber.value;
    co.diameter = this.blankForm.controls.holeDiameter.value;
    return co;
  }

  private getGrades() {
    this.gradeService.getAll().subscribe(grades => {
      this.grades = grades;
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
      this.blankForm.controls.diameter.setValue(this.data.diameter);
      this.blankForm.controls.length.setValue(this.data.length);
      this.blankForm.controls.minimumQuantity.setValue(this.data.minimumQuantity);
      this.setGrade();
      if (this.data.coolantHole) {
        this.hasCoolantHole = true;
        this.setCoolantHoleType();
        this.blankForm.controls.holesNumber.setValue(this.data.coolantHole.quantity);
        this.blankForm.controls.holeDiameter.setValue(this.data.coolantHole.diameter);
      }
    }
  }

  private setGrade() {
    const grade = this.grades.filter(x => x.code === this.data.grade.code)[0];
    this.blankForm.controls.grade.setValue(grade);
  }

  private setCoolantHoleType() {
    const type = this.types.filter(x => x.idTypeCoolantHole === this.data.coolantHole.typeCoolantHole.idTypeCoolantHole)[0];
    this.blankForm.controls.coolantHoleType.setValue(type);
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
      this.coolantHole = 'CT';
      this.blankForm.controls.holesNumber.setValidators([Validators.required]);
      this.blankForm.controls.holeDiameter.setValidators([Validators.required]);
      this.blankForm.controls.coolantHoleType.setValidators([Validators.required]);
    } else {
      this.coolantHole = '';
      this.blankForm.controls.holesNumber.clearValidators();
      this.blankForm.controls.holeDiameter.clearValidators();
      this.blankForm.controls.coolantHoleType.clearValidators();
    }
    this.updateName();
  }

  private inputChanges() {
    this.blankForm.controls.diameter.valueChanges
      .subscribe(term => {
        this.diameter = term;
        this.updateName();
      });
    this.blankForm.controls.length.valueChanges
      .subscribe(term => {
        this.length = term;
        this.updateName();
      });
    this.blankForm.controls.grade.valueChanges
      .subscribe(term => {
        this.grade = term.description;
        this.updateName();
      });
  }

  private updateName() {
    const name = this.diameter + ' x ' + this.length + ' - ' + this.grade + this.coolantHole;
    this.blankForm.controls.name.setValue(name);
  }
}
