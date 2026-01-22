import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'daily-plan-n',
  templateUrl: './daily-plan-n.component.html',
  styleUrls: ['./daily-plan-n.component.css']
})
export class DailyPlanNComponent implements OnInit, AfterViewInit, OnChanges {
  planForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper;
  @Input() planData: any;
  @Input() noteType: string;

  instructionsList = [
    { label: 'Progressing Patient Next Visit', value: 'progressing_patient_next_visit' },
    { label: 'Progress Therapeutic Exercises', value: 'progress_therapeutic_exercises' },
    { label: 'Progress Note Needed', value: 'progress_note_needed' },
    { label: 'Anticipate Discharging Patient Next Visit', value: 'anticipate_discharging' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.planForm = this.fb.group({
      instructions: [''],
      free_area_text: ['']
    });

    if (this.planData) {
      this.fillFormWithData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planData'] && changes['planData'].currentValue && this.planForm) {
      this.fillFormWithData();
    }
  }

  ngAfterViewInit(): void {
    this.formReady.emit(this.planForm);
  }

  private fillFormWithData(): void {
    if (!this.planData) {
      return;
    }

    this.planForm.patchValue({
      instructions: this.planData.instructions || '',
      free_area_text: this.planData.free_area_text || ''
    });
  }
}
