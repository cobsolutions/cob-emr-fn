import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PainDescription } from '../../../../lookups/pain.description';

@Component({
  selector: 'pain-evaluation',
  templateUrl: './pain-evaluation.component.html',
  styleUrls: ['./pain-evaluation.component.css']
})
export class PainEvaluationComponent implements OnInit, AfterViewInit, OnDestroy {
  painEval: FormGroup;
  numbers = ['NT', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  @Input() painEvals: any[] = [];
  @Output() removePainScale = new EventEmitter<number>();
  @Output() saveEval = new EventEmitter<any>();

  descriptions: string[] = PainDescription;

  showModal = false;
  editIndex: number | null = null;

  // Reference to the c-modal host element so we can portal it to <body>.
  // CoreUI's c-modal renders in place; any ancestor with `transform` /
  // `filter` / `perspective` (e.g. `.enhanced-card:hover` in subjective.component.css)
  // becomes the containing block for `position: fixed`, which breaks the
  // modal's viewport anchoring. Appending to <body> sidesteps that entirely.
  @ViewChild('painModalRef', { read: ElementRef, static: true })
  private painModalRef: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.painEvals) this.painEvals = [];
    this.createForm();
  }

  ngAfterViewInit(): void {
    const el = this.painModalRef?.nativeElement;
    if (el && el.parentNode !== document.body) {
      document.body.appendChild(el);
    }
  }

  ngOnDestroy(): void {
    // Tear down the portalled element so it doesn't leak when the component unmounts.
    const el = this.painModalRef?.nativeElement;
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
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
    this.painEval.reset({
      location: '',
      worst: '',
      current: '',
      best: '',
      description: 'Not Tested',
      custom: '',
      plan: ''
    });
    this.showModal = true;
  }

  openEditModal(index: number): void {
    this.editIndex = index;
    const evalData = this.painEvals[index];
    // Ensure numeric fields are properly typed for radio button comparison
    this.painEval.patchValue({
      location: evalData.location || '',
      worst: evalData.worst === 'NT' ? 'NT' : (evalData.worst !== null && evalData.worst !== undefined ? Number(evalData.worst) : ''),
      current: evalData.current === 'NT' ? 'NT' : (evalData.current !== null && evalData.current !== undefined ? Number(evalData.current) : ''),
      best: evalData.best === 'NT' ? 'NT' : (evalData.best !== null && evalData.best !== undefined ? Number(evalData.best) : ''),
      description: evalData.description || 'Not Tested',
      custom: evalData.custom || '',
      plan: evalData.plan || ''
    });

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.painEval.reset({
      location: '',
      worst: '',
      current: '',
      best: '',
      description: 'Not Tested',
      custom: '',
      plan: ''
    });
    this.editIndex = null;
  }

  remove(index: number): void {
    this.painEvals.splice(index, 1);
    this.removePainScale.emit(index);
  }

  save(): void {
    const painEval = this.getAllFormValues(this.painEval);

    if (this.editIndex !== null) {
      // Update existing record - preserve the id if it exists
      const existingId = this.painEvals[this.editIndex].id;
      if (existingId !== undefined && existingId !== null) {
        painEval.id = existingId;
      }
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
