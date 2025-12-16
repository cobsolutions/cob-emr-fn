import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'special-tests-n',
  templateUrl: './special-tests-n.component.html',
  styleUrls: ['./special-tests-n.component.css']
})
export class SpecialTestsNComponent implements OnInit {
  specialTestForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  showFlexibilityFields: boolean = false;
  showStructuralFields: boolean = false;
  showLigamentIntegrityKneeFields: boolean = false;
  showStorkStandSiMobilityTestFields: boolean = false;
  showPatellofemoralFields: boolean = false;
  showFunctionalFields: boolean = false;
  showAlarLigamentTestFields: boolean = false;
  showAlarLigamentStressFields: boolean = false;
  showWorkConditioningFields: boolean = false;
  showTmrFab4WorksheetFields: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
  }
  initForm() {
    this.specialTestForm = this.fb.group({
      flexibility: ['no'],
      structural: ['no'],
      ligament_integrity_knee: ['no'],
      stork_stand_si_mobility_test: ['no'],
      patellofemoral: ['no'],
      functional: ['no'],
      alar_ligament_test: ['no'],
      alar_ligament_stress: ['no'],
      work_conditioning: ['no'],
      tmr_fab_4_worksheet: ['no']
    })
  }
  setupValueChangeListeners() {
    this.specialTestForm.get('flexibility')?.valueChanges.subscribe(value => {
      this.showFlexibilityFields = value === 'yes';
    });

    this.specialTestForm.get('structural')?.valueChanges.subscribe(value => {
      this.showStructuralFields = value === 'yes';
    });

    this.specialTestForm.get('ligament_integrity_knee')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeFields = value === 'yes';
    });

    this.specialTestForm.get('stork_stand_si_mobility_test')?.valueChanges.subscribe(value => {
      this.showStorkStandSiMobilityTestFields = value === 'yes';
    });

    this.specialTestForm.get('patellofemoral')?.valueChanges.subscribe(value => {
      this.showPatellofemoralFields = value === 'yes';
    });

    this.specialTestForm.get('functional')?.valueChanges.subscribe(value => {
      this.showFunctionalFields = value === 'yes';
    });

    this.specialTestForm.get('alar_ligament_test')?.valueChanges.subscribe(value => {
      this.showAlarLigamentTestFields = value === 'yes';
    });

    this.specialTestForm.get('alar_ligament_stress')?.valueChanges.subscribe(value => {
      this.showAlarLigamentStressFields = value === 'yes';
    });

    this.specialTestForm.get('work_conditioning')?.valueChanges.subscribe(value => {
      this.showWorkConditioningFields = value === 'yes';
    });

    this.specialTestForm.get('tmr_fab_4_worksheet')?.valueChanges.subscribe(value => {
      this.showTmrFab4WorksheetFields = value === 'yes';
    });
  }

}
