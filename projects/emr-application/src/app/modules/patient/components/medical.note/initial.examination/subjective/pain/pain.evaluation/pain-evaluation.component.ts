import { outputAst } from '@angular/compiler';
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
  @Input() painScale: string
  @Input() painEvals: any[] = [];
  @Output() removePainScale = new EventEmitter<number>()
  @Output() saveEval = new EventEmitter<any>()

  painLevels = [
    { label: 'At worst:', control: 'atWorst' },
    { label: 'Current:', control: 'current' },
    { label: 'At best:', control: 'atBest' }
  ];
  descriptions: string[] = PainDescription;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.painEval = this.fb.group({
      'location': new FormControl(),
      'worst': new FormControl(),
      'current': new FormControl(),
      'best': new FormControl(),
      'description': new FormControl(),
      'plan': new FormControl(),
    });
  }
  remove(index: number) {
    this.painEvals.splice(index, 1);
    this.removePainScale.emit(index);
  }
  add() {
    var painEval: any = this.getAllFormValues(this.painEval)
    this.painEvals.push(painEval)
    this.saveEval.emit(painEval)
    this.painEval.reset();
  }
  getAllFormValues(formGroup: FormGroup): any {
    const values: any = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        values[key] = control.value;
      } else if (control instanceof FormGroup) {
        values[key] = this.getAllFormValues(control); // Recursively get values from nested FormGroup
      } else if (control instanceof FormArray) {
        values[key] = control.controls.map(ctrl =>
          ctrl instanceof FormGroup ? this.getAllFormValues(ctrl) : ctrl.value
        );
      }
    });
    return values;
  }
}
