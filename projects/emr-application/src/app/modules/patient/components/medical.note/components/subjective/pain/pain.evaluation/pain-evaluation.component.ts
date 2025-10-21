import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PainDescription } from '../../../../lookups/pain.description';

@Component({
  selector: 'pain-evaluation',
  templateUrl: './pain-evaluation.component.html',
  styleUrls: ['./pain-evaluation.component.css']
})
export class PainEvaluationComponent implements OnInit {
  painEval: FormGroup;
  numbers = ['NT', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  @Input() painEvals: any[] = [];
  @Output() removePainScale = new EventEmitter<number>();
  @Output() saveEval = new EventEmitter<any>();

  descriptions: string[] = PainDescription;

  showModal = false;
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.painEvals) this.painEvals = [];
    this.createForm();
  }

  createForm(): void {
    this.painEval = this.fb.group({
      location: new FormControl(''),
      worst: new FormControl(''),
      current: new FormControl(''),
      best: new FormControl(''),
      description: new FormControl('Not Tested'),
      custom: new FormControl(''),
      plan: new FormControl('')
    });
  }

  openAddModal(): void {
    this.editIndex = null;
    this.painEval.reset();
    this.showModal = true;
  }

  openEditModal(index: number): void {
    this.editIndex = index;
    this.painEval.patchValue(this.painEvals[index]);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.painEval.reset();
  }

  remove(index: number): void {
    this.painEvals.splice(index, 1);
    this.removePainScale.emit(index);
  }

  save(): void {
    const painEval = this.getAllFormValues(this.painEval);

    if (this.editIndex !== null) {
      // Update existing record
      this.painEvals[this.editIndex] = painEval;
    } else {
      // Add new record
      this.painEvals.push(painEval);
    }

    this.saveEval.emit(painEval);
    this.closeModal();
  }

  getAllFormValues(formGroup: FormGroup): any {
    const values: any = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        values[key] = control.value;
      } else if (control instanceof FormGroup) {
        values[key] = this.getAllFormValues(control);
      } else if (control instanceof FormArray) {
        values[key] = control.controls.map(ctrl =>
          ctrl instanceof FormGroup ? this.getAllFormValues(ctrl) : ctrl.value
        );
      }
    });
    return values;
  }
}
