import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormDependencyClearerService } from 'projects/emr-application/src/app/modules/common/service/form-dependency-clearer.service';

@Component({
  selector: 'subjective-pain-n',
  templateUrl: './pain-n.component.html',
  styleUrls: ['./pain-n.component.css']
})
export class PainNComponent implements OnInit, OnChanges, OnDestroy {
  painForm!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() painFormData: any;
  showPainScale: boolean = false;
  showRestrictionsPainAlleviators: boolean = false;

  // Pain evaluation data
  painEvaluations: any[] = [];

  private readonly FORM_ID = 'pain-n-form';

  aggravatingFactorsOptions = [
    { value: 'sitting', label: 'Sitting' },
    { value: 'standing', label: 'Standing' },
    { value: 'walking', label: 'Walking' },
    { value: 'stairs_up', label: 'Stairs - up' },
    { value: 'stairs_down', label: 'Stairs - down' },
    { value: 'sit_to_stand', label: 'Sit to stand' },
    { value: 'bending', label: 'Bending' },
    { value: 'voiding', label: 'Voiding' },
    { value: 'lying_down', label: 'Lying Down' },
    { value: 'cough_sneeze', label: 'Cough/sneeze' }
  ]

  constructor(
    private fb: FormBuilder,
    private formDependencyClearer: FormDependencyClearerService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.patchFormData();
    this.setupValueChangeListeners();
    this.formReady.emit(this.painForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // React to changes in painFormData
    if (changes['painFormData'] && !changes['painFormData'].firstChange && this.painForm) {
      this.patchFormData();
    }
  }
  initForm() {
    this.painForm = this.fb.group({
      pain_scale: ['no'],
      pain_evaluations: [[]],
      aggravating_factors: [],
      restrictions_pain_alleviators: ['no'],
      restrictions_pain_alleviators_text: [''],
    })
  }
  setupValueChangeListeners() {
    // Set up visibility listeners
    this.painForm.get('pain_scale')?.valueChanges.subscribe(value => {
      this.showPainScale = value === 'yes'
    })
    this.painForm.get('restrictions_pain_alleviators')?.valueChanges.subscribe(value => {
      this.showRestrictionsPainAlleviators = value === 'yes'
    })

    // Set up dependency clearing using the generic service
    this.formDependencyClearer.setupDependencies(this.painForm, [
      {
        parentField: 'pain_scale',
        showWhenValue: 'yes',
        dependentFields: ['pain_evaluations'],
        clearValues: { pain_evaluations: [] }
      },
      {
        parentField: 'restrictions_pain_alleviators',
        showWhenValue: 'yes',
        dependentFields: ['restrictions_pain_alleviators_text']
      }
    ], this.FORM_ID);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.formDependencyClearer.cleanup(this.FORM_ID);
  }

  patchFormData() {
    if (this.painFormData) {
      // Handle both DTO format (camelCase) and form format (snake_case)
      const formData = {
        pain_scale: this.painFormData.pain_scale ||
          (this.painFormData.painScale !== undefined ? (this.painFormData.painScale ? 'yes' : 'no') : 'no'),
        pain_evaluations: this.painFormData.pain_evaluations || this.painFormData.painEvaluations || [],
        aggravating_factors: this.painFormData.aggravating_factors || this.painFormData.aggravatingFactors || [],
        restrictions_pain_alleviators: this.painFormData.restrictions_pain_alleviators ||
          (this.painFormData.restrictionsPainAlleviators !== undefined ?
            (this.painFormData.restrictionsPainAlleviators ? 'yes' : 'no') : 'no'),
        restrictions_pain_alleviators_text: this.painFormData.restrictions_pain_alleviators_text ||
          this.painFormData.restrictionsPainAlleviatorsText || ''
      };

      this.painForm.patchValue(formData);

      // Set pain evaluations array
      if (formData.pain_evaluations && formData.pain_evaluations.length > 0) {
        this.painEvaluations = formData.pain_evaluations;
      }

      // Set visibility flags based on patched values
      if (formData.pain_scale === 'yes') {
        this.showPainScale = true;
      }
      if (formData.restrictions_pain_alleviators === 'yes') {
        this.showRestrictionsPainAlleviators = true;
      }
    }
  }

  // Handle pain evaluation save
  handlePainEvalSave(evaluation: any): void {
    this.painForm.patchValue({
      pain_evaluations: this.painEvaluations
    });
  }

  // Handle pain evaluation removal
  handlePainEvalRemove(index: number): void {
    this.painForm.patchValue({
      pain_evaluations: this.painEvaluations
    });
  }

}
