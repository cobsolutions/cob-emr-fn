import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'assessment-goals',
  templateUrl: './assessment-goals.component.html',
  styleUrls: ['./assessment-goals.component.scss']
})
export class AssessmentGoalsComponent implements OnInit {

  @Input() goalsFormArray!: FormArray;
  @Output() goalAdded = new EventEmitter<any>();
  @Output() goalEdited = new EventEmitter<{ index: number; value: any }>();
  @Output() goalRemoved = new EventEmitter<number>();

  showModal = false;
  editIndex: number | null = null;
  showCustomPeriodInput = false;
  goalForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }
  buildForm(goal: any = null): void {
    this.goalForm = this.fb.group({
      description: new FormControl(goal?.description || ''),
      term: new FormControl(goal?.term || 'Short Term'),
      period: new FormControl(goal?.period || '1-week'),
      met: new FormControl(goal?.met || 'N/A'),
      customPeriod: new FormControl(goal?.customPeriod || '')
    });

    // Show custom field if "Custom" selected
    this.showCustomPeriodInput = this.goalForm.get('period')?.value === 'custom';

    this.goalForm.get('period')?.valueChanges.subscribe((value) => {
      this.showCustomPeriodInput = value === 'custom';
      if (value !== 'custom') {
        this.goalForm.patchValue({ customPeriod: '' }, { emitEvent: false });
      }
    });
  }
  openModal(goal?: any, index?: number): void {
    this.showModal = true;
    if (goal) {
      this.editIndex = index!;
      this.goalForm.patchValue(goal);
    } else {
      this.editIndex = null;
      this.goalForm.reset({
        term: 'Short Term',
        period: '1-week',
        met: 'N/A'
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.goalForm.reset();
  }

  /** Instead of modifying the FormArray directly, just emit the event */
  saveGoal(): void {
    const goalValue = this.goalForm.value;
    if (this.goalForm.invalid) return;

    if (this.editIndex !== null) {
      this.goalEdited.emit({ index: this.editIndex, value: goalValue });
    } else {
      this.goalAdded.emit(goalValue);
    }

    this.closeModal();
  }

  /** Only emit index for removal */
  removeGoal(index: number): void {
    this.goalRemoved.emit(index);
  }

  getGoalFormGroup(i: number): FormGroup {
    return this.goalsFormArray.at(i) as FormGroup;
  }
  ngOnInit(): void {
    this.buildForm();
  }


}
