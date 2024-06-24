import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhoneType } from '../../../../common/models/enums/phone.type';
import { Emergency } from '../../../models/emergency/patient.emergency';
import { Patient } from '../../../models/patient';

@Component({
  selector: 'app-patient-emergency-info',
  templateUrl: './patient-emergency-info.component.html',
  styleUrls: ['./patient-emergency-info.component.css']
})
export class PatientEmergencyInfoComponent implements OnInit {
  @Input() patient: Patient;
  phoneTypes = PhoneType;
  emergency: Emergency = {
    contactName: '',
    phoneType: null,
    phoneNumber: '',
    otherPhoneType: '',
    additionalInfo: ''
  }
  @ViewChild('emergencyContactForm') emergencyContactForm: NgForm;
  @Input() componentRole: string[]
  constructor() { }

  ngOnInit(): void {
  }

  add() {
    if (this.emergencyContactForm.valid) {
      let EmergencyContact: Emergency = Object.assign({}, this.emergency);
      this.patient.emergencies.push(EmergencyContact);
      this.emergencyContactForm.reset();
    }
  }
  remove(index: number) {
    this.patient.emergencies.splice(index, 1);
  }
}
