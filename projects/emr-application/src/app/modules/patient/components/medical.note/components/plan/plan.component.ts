import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
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
  @Input() creator: string
  @Input() noteFinalizr: string
  @Input() noteType: MedicalNoteType
  @Input() planData: any
  @Input() noteId: number
  authorizthedToFinalize: boolean = false
  forwardVisibility: boolean = false;
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
  constructor(private fb: FormBuilder,
    private medialNoteService: MedialNoteService,
    private loggedInService: LoggedInService
  ) { }

  ngOnInit(): void {
    this.isAuthorizthedToFinalize()
    this.medialNoteService.find('plan').subscribe(fields => {
      this.fields = fields
      this.planForm = this.fb.group({
        createPlanOfCare: new FormControl(false),
        frequency: ['F00'],
        duration: ['D00'],
        plan: ['PL01'],
        physicianSignature: new FormControl(false),
        procedures: this.fb.group({}),
        modalities: this.fb.group({}),
        specialties: this.fb.group({}),
      });
      if (this.planData)
        setTimeout(() => {
          this.planForm.patchValue(this.planData);
        }, 10);
      this.formReady.emit(this.planForm);
    })

  }
  next() {
    this.stepper.next();
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.planForm.setControl(section, formGroup);
  }
  finalize() {
    this.medialNoteService.medicalNoteType.next(this.noteType)
  }
  isAuthorizthedToFinalize() {
    const logged: string = this.loggedInService.getLoggedUser().uuid;
    if (this.creator === logged && this.noteFinalizr === null)
      this.authorizthedToFinalize = true;
    if (this.noteFinalizr !== null && this.noteFinalizr === logged)
      this.authorizthedToFinalize = true;
  }
  toggleFrowardModal() {
    this.forwardVisibility = !this.forwardVisibility
  }
  changeVisibility(event: string) {
    if (event === 'close') {
      this.forwardVisibility = false;
      this.authorizthedToFinalize = false
    }
  }
}
