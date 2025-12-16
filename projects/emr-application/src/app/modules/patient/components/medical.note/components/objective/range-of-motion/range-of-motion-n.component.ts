import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'range-of-motion-n',
  templateUrl: './range-of-motion-n.component.html',
  styleUrls: ['./range-of-motion-n.component.css']
})
export class RangeOfMotionNComponent implements OnInit {
  romForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();

  // Visibility flags for dependent fields
  showNoLimitationsNotedFields: boolean = false;
  showCervicalAromFields: boolean = false;
  showCostovertebralExpansionFields: boolean = false;
  showShoulderAromFields: boolean = false;
  showShoulderPromFields: boolean = false;
  showElbowAromFields: boolean = false;
  showElbowPromFields: boolean = false;
  showWristAromFields: boolean = false;
  showWristPromFields: boolean = false;
  showHandAromPromFields: boolean = false;
  showThoracicAromSittingWithPassiveOverpressureFields: boolean = false;
  showThoracicAromStandingFields: boolean = false;
  showLumbarAromFields: boolean = false;
  showHipAromFields: boolean = false;
  showHipPromFields: boolean = false;
  showKneeAromFields: boolean = false;
  showKneePromFields: boolean = false;
  showAnkleAromFields: boolean = false;
  showAnklePromFields: boolean = false;
  show1stMtpAromFields: boolean = false;
  show1stMtpPromFields: boolean = false;
  show1stIpAromFields: boolean = false;
  show1stIpPromFields: boolean = false;
  showToeAromFields: boolean = false;
  showToePromFields: boolean = false;
  showAdditionalCommentsFields: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    this.formReady.emit(this.romForm);
  }
  initForm() {
    this.romForm = this.fb.group({
      no_limitations_noted: ['no'],
      cervical_arrom: ['no'],
      costovertebral_expansion: ['no'],
      shoulder_arrom: ['no'],
      shoulder_prom: ['no'],
      elbow_arrom: ['no'],
      elbow_prom: ['no'],
      wrist_arrom: ['no'],
      wrist_prom: ['no'],
      hand_arrom_prom: ['no'],
      thoracic_arrom_sitting_with_passive_overpressure: ['no'],
      thoracic_arrom_standing: ['no'],
      lumbar_arrom: ['no'],
      hip_arrom: ['no'],
      hip_prom: ['no'],
      knee_arrom: ['no'],
      knee_prom: ['no'],
      ankle_arrom: ['no'],
      ankle_prom: ['no'],
      fst_mtp_arrom: ['no'],
      fst_mtp_prom: ['no'],
      fst_ip_arrom: ['no'],
      fst_ip_prom: ['no'],
      toe_arrom: ['no'],
      toe_prom: ['no'],
      additional_comments: ['no']
    })
  }
  setupValueChangeListeners() {
  }

}
