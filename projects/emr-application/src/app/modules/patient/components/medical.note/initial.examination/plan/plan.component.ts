import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  planForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  frequencyOptions = ['Custom', 'Daily', 'Weekly'];
  durationOptions = ['Custom', '2 Weeks', '1 Month'];
  planOptions = ['Custom', 'Standard', 'Advanced'];

  procedures = [
    { label: 'Therapeutic Exercises', value: 'therapeuticExercises' },
    { label: 'Therapeutic Activity', value: 'therapeuticActivity' },
    { label: 'Gait Training', value: 'gaitTraining' },
    { label: 'Neuromuscular Rehabilitation', value: 'neuromuscularRehabilitation' },
    { label: 'Manual Therapy', value: 'manualTherapy' },
    { label: 'Massage', value: 'massage' },
    { label: 'Aquatic Therapy', value: 'aquaticTherapy' },
    { label: 'Splinting/Taping', value: 'splintingTaping' },
    { label: 'Canalith Repositioning', value: 'canalithRepositioning' },
    { label: 'Wound Care/Debridement', value: 'woundCareDebridement' },
    { label: 'Iontophoresis', value: 'iontophoresis' },
    { label: 'Group Therapy', value: 'groupTherapy' },
    { label: 'Cardiac Rehabilitation', value: 'cardiacRehabilitation' },
    { label: 'Vestibular Rehabilitation', value: 'vestibularRehabilitation' },
    { label: 'Patient Education', value: 'patientEducation' },
    { label: 'Self Care', value: 'selfCare' },
    { label: 'Cognition', value: 'cognition' },
    { label: 'Remote Therapeutic Monitoring', value: 'remoteTherapeuticMonitoring' }
  ];

  modalities = [
    { label: 'Pain Relief', value: 'painRelief' },
    { label: 'Decrease Inflammation', value: 'decreaseInflammation' },
    { label: 'Increase Blood Flow', value: 'increaseBloodFlow' },
    { label: 'Improve Tissue Healing', value: 'improveTissueHealing' },
    { label: 'Electrical Stimulation', value: 'electricalStimulation' },
    { label: 'Ultrasound/Phonophoresis', value: 'ultrasoundPhonophoresis' },
    { label: 'Laser', value: 'laser' },
    { label: 'Infrared Light', value: 'infraredLight' },
    { label: 'Diathermy', value: 'diathermy' },
    { label: 'Vasopneumatic', value: 'vasopneumatic' },
    { label: 'Biofeedback Training', value: 'biofeedbackTraining' },
    { label: 'Hot Packs', value: 'hotPacks' },
    { label: 'Mechanical Traction', value: 'mechanicalTraction' }
  ];

  specialties = [
    { label: 'Orthotic Fabrication', value: 'orthoticFabrication' },
    { label: 'TENS Fitting', value: 'tensFitting' },
    { label: 'Acupuncture', value: 'acupuncture' },
    { label: 'Other', value: 'otherSpecialty' }
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.planForm = this.fb.group({
      createPlanOfCare: [false],
      frequency: ['Custom'],
      duration: ['Custom'],
      plan: ['Custom'],
      physicianSignature: [false]
    });
    this.procedures.forEach(proc => this.planForm.addControl(proc.value, this.fb.control(false)));
    this.modalities.forEach(mod => this.planForm.addControl(mod.value, this.fb.control(false)));
    this.specialties.forEach(spec => this.planForm.addControl(spec.value, this.fb.control(false)));
  }
  next() {
    this.stepper.next();
  }
}
