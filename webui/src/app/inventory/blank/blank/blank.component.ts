import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef} from '@angular/material';

import { BehaviorSubject } from 'rxjs';

import {Blank} from '../../../models/blank';
import {GradeService} from '../../../services/grade.service';
import {Grade} from '../../../models/grade';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

  public code = '';
  public diameter = '';
  public length = '';
  public grade = '';
  public coolantHole = '';

  public grades: Grade[] = [];
  public filteredGrades: BehaviorSubject<Grade[]> = new BehaviorSubject<Grade[]>([]);
  public fcGradeSearch: FormControl = new FormControl('');

  public blankForm: FormGroup;
  public hasCoolantHole = false;

  constructor(
    public dialogRef: MatDialogRef<BlankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Blank,
    private gradeService: GradeService) {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.blankForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(254)]),
      code: new FormControl('', Validators.required),
      stockQuantity: new FormControl('', Validators.required),
      minimumQuantity: new FormControl('', Validators.required),
      diameter: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      length: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      grade: new FormControl('', Validators.required)
    });
    this.getGrades();
    this.inputChanges();
  }

  public close(): void {
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

    blank.code = controls.code.value;
    blank.name = controls.name.value;
    blank.stockQuantity = controls.stockQuantity.value;
    blank.minimumQuantity = controls.minimumQuantity.value;
    blank.length = controls.length.value;
    blank.diameter = controls.diameter.value;
    blank.grade = controls.grade.value;

    if (this.hasCoolantHole) {
      blank.coolantHole = true;
    } else {
      blank.coolantHole = false;
    }

    return blank;
  }

  private getGrades(): void {
    this.gradeService.getAll().subscribe(grades => {
      this.grades = grades;
      this.filteredGrades.next(grades);
      this.setValues();
    });
  }

  private setValues(): void {
    if (this.data) {
      this.blankForm.controls.code.setValue(this.data.code);
      this.blankForm.controls.name.setValue(this.data.name);
      this.blankForm.controls.stockQuantity.setValue(this.data.stockQuantity);
      this.blankForm.controls.minimumQuantity.setValue(this.data.minimumQuantity);
      this.blankForm.controls.diameter.setValue(this.data.diameter);
      this.blankForm.controls.length.setValue(this.data.length);
      this.blankForm.controls.minimumQuantity.setValue(this.data.minimumQuantity);
      this.setGrade();
      if (this.data.coolantHole) {
        this.hasCoolantHole = true;
      }
    }
  }

  private setGrade() {
    const grade = this.grades.filter(x => x.code === this.data.grade.code)[0];
    this.blankForm.controls.grade.setValue(grade);
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

  public showCoolantHoleOptions($event: MatCheckboxChange): void {
    this.hasCoolantHole = !this.hasCoolantHole;

    if (this.hasCoolantHole) {
      this.coolantHole = 'CT';
    } else {
      this.coolantHole = '';
    }
    this.updateName();
  }

  private inputChanges(): void {
    this.blankForm.controls.code.valueChanges
      .subscribe(term => {
        this.code = term;
        this.updateName();
      });
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
    const name = this.code + ' - ' + this.diameter + ' x ' + this.length + ' - ' + this.grade + ' ' + this.coolantHole;
    this.blankForm.controls.name.setValue(name);
  }

  public filterGrade(): void {
    if (this.fcGradeSearch.value === '') {
      this.filteredGrades.next(this.grades);
    } else {
      this.filteredGrades.next(this.grades.filter(t => t.description.toLocaleLowerCase().includes(
        this.fcGradeSearch.value.toLocaleLowerCase()
      )));
    }
  }

  public resetGrade(): void {
    this.filteredGrades.next(this.grades);
  }
}
