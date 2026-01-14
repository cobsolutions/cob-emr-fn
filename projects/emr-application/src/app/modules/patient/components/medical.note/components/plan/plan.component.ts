import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { SoapService } from '../../../../services/medical.note/soap/soap.service';
import { FieldControlStyles } from '../../filed.control.style.selector/field.control.style';
import { PlanStyles } from './styles/plan';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit, AfterViewInit, OnChanges {
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
  @Input() planData: any
  @Input() noteId: number
  @Input() noteType: string
  // authorizthedToFinalize: boolean = false
  forwardVisibility: boolean = false;

  // Data for child components
  proceduresData: any = null;
  modalitiesData: any = null;
  specialtiesData: any = null;
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
    private soapService: SoapService
  ) { }

  ngOnInit(): void {
    this.planForm = this.fb.group({
      create_plan_of_care: new FormControl(false),
      frequency: ['F00'],
      duration: ['D00'],
      plan: ['PL01'],
      physician_signature: new FormControl(false),
      procedures: this.fb.group({}),
      modalities: this.fb.group({}),
      specialties: this.fb.group({}),
    });

    // Fill form if planData is already available
    if (this.planData) {
      this.fillFormWithData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Handle when planData changes
    if (changes['planData'] && changes['planData'].currentValue && this.planForm) {
      this.fillFormWithData();
    }
  }

  ngAfterViewInit(): void {
    this.formReady.emit(this.planForm);
  }
  next() {
    this.stepper.next();
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.planForm.setControl(section, formGroup);
  }
  finalize() {
  }
  // isAuthorizthedToFinalize() {
  //   const logged: string = this.loggedInService.getLoggedUser().uuid;
  //   if (this.creator === logged && this.noteFinalizr === null)
  //     this.authorizthedToFinalize = true;
  //   if (this.noteFinalizr !== null && this.noteFinalizr === logged)
  //     this.authorizthedToFinalize = true;
  // }
  toggleFrowardModal() {
    this.forwardVisibility = !this.forwardVisibility
  }
  changeVisibility(event: string) {
    if (event === 'close') {
      this.forwardVisibility = false;
      // this.authorizthedToFinalize = false
    }
  }

  private fillFormWithData(): void {
    if (!this.planData) {
      return;
    }

    // Patch the main form fields
    this.planForm.patchValue({
      create_plan_of_care: this.planData.create_plan_of_care || false,
      frequency: this.planData.frequency || 'F00',
      duration: this.planData.duration || 'D00',
      plan: this.planData.plan || 'PL01',
      physician_signature: this.planData.physician_signature || false
    });

    // Extract data for child components
    this.proceduresData = this.extractProceduresData(this.planData);
    this.modalitiesData = this.extractModalitiesData(this.planData);
    this.specialtiesData = this.extractSpecialtiesData(this.planData);
  }

  private extractProceduresData(data: any): any {
    if (!data) return null;

    const procedureFields = {};
    Object.keys(data).forEach(key => {
      if (key.startsWith('procedure_')) {
        procedureFields[key] = data[key];
      }
    });

    return Object.keys(procedureFields).length > 0 ? procedureFields : null;
  }

  private extractModalitiesData(data: any): any {
    if (!data) return null;

    const modalitiesFields = {};
    Object.keys(data).forEach(key => {
      // Include both modalities_ and procedure_ prefixes since modalities children may use procedure_ prefix
      if (key.startsWith('modalities_') || key.startsWith('procedure_')) {
        modalitiesFields[key] = data[key];
      }
    });

    return Object.keys(modalitiesFields).length > 0 ? modalitiesFields : null;
  }

  private extractSpecialtiesData(data: any): any {
    if (!data) return null;

    // Specialties use modalities_ prefix but are in the specialties section
    // Based on the mapper, specialties include: modalities_orthotic_fabrication, modalities_tens_fitting, modalities_acupuncture, modalities_other
    const specialtiesFields = {};
    const specialtyKeys = ['modalities_orthotic_fabrication', 'modalities_orthotic_fabrication_notes',
      'modalities_tens_fitting', 'modalities_tens_fitting_notes',
      'modalities_acupuncture', 'modalities_acupuncture_notes',
      'modalities_other', 'modalities_other_notes'];

    specialtyKeys.forEach(key => {
      if (data.hasOwnProperty(key)) {
        specialtiesFields[key] = data[key];
      }
    });

    return Object.keys(specialtiesFields).length > 0 ? specialtiesFields : null;
  }
}
