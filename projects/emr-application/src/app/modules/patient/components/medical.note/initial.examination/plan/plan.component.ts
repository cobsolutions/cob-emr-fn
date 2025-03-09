import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FieldDependentsService } from '../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { FieldControlStyles } from '../../filed.control.style.selector/field.control.style';
import { PlanStyles } from './styles/plan';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  planForm: FormGroup;
  fields: any
  styles: FieldControlStyles[] = PlanStyles;
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
  constructor(private fb: FormBuilder, private medialNoteService: MedialNoteService
    , private fieldDependentsService: FieldDependentsService) { }

  ngOnInit(): void {
    this.medialNoteService.find('plan').subscribe(fields => {
      console.log(JSON.stringify(fields))
      this.fields = fields['plan']
      console.log(JSON.stringify(this.fields))
    })
    this.planForm = this.fb.group({
      createPlanOfCare: [''],
      frequency: ['F00'],
      duration: ['D00'],
      plan: ['PL01'],
      physicianSignature: ['']
    });
    this.formReady.emit(this.planForm);
  }
  next() {
    this.stepper.next();
  }
}
