import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BasicComponent } from 'projects/emr-application/src/app/util/basic.component';
import { catchError, EMPTY } from 'rxjs';
import { AddressComponent } from '../../../common/components/address/address.component';
import { ContactComponent } from '../../../common/components/contact/contact.component';
import { Patient } from '../../models/patient';
import { PatientCreationService } from '../../services/patient/patient-creation.service';
import { PatientBasicInfoComponent } from './patient.basic.info/patient-basic-info.component';
import { PatientCaseInfoComponent } from './patient.case.info/patient-case-info.component';
import { PatientIdInfoComponent } from './patient.id.info/patient-id-info.component';
import { PatientInsuranceInfoComponent } from './patient.insurance.info/patient-insurance-info.component';
@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit, AfterViewInit {
  @ViewChildren('component') components: QueryList<BasicComponent>;
  @Input() selectedPatient: Patient;
  valid: boolean = true;

  basicInvalidFields: string[] = [];
  idInvalidFields: string[] = [];
  addressInvalidFields: string[] = [];
  contactInvalidFields: string[] = [];
  clinicInvalidFields: string[] = [];
  insuranceInvalidFields: string[] = [];
  caseInvalidFields: string[] = [];
  patient: Patient = {
    id: null,
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: 0,
    birthDate_date: null,
    gender: null,
    maritalStatus: null,
    suffix: null,
    employerName: '',
    title: null,
    addtionalInfo: '',
    idType: null,
    patientId: '',
    effectiveFromDate: 0,
    effectiveFromDate_Date: null,
    effectiveToDate: 0,
    effectiveToDate_Date: null,
    addresses: [],
    contacts: [],
    emergencies: [],
    isDependent: false,
    dependent: {
      address: {
        addressType: null,
        other: null,
        firstAddress: null,
        secondAddress: null,
        country: null,
        city: null,
        province: null,
        state: null,
        zipCode: null
      },
      phone: null,
      name: null
    },
    clinicsId: [],
    cases: [],
    patientInsuranceModels: []
  };
  constructor(private toastr: ToastrService,
    private patientCreationService: PatientCreationService,
    private router: Router) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    if (this.selectedPatient) {
      this.patient = this.selectedPatient;
      this.convertLongToDate()
    }
  }


  create() {
    this.valid = this.isPatientFeildsAreValid();
    if (this.valid) {
      this.converPatientFields();
      this.patientCreationService.create(this.patient)
        .pipe(
          catchError((error) => {
            console.log(error)
            this.toastr.error(error, 'Error In Creation');
            return EMPTY;

          })
        )
        .subscribe(() => {
          this.resetFormComponents();
          this.toastr.success('Pateint Created.');
          this.router.navigateByUrl('emr/patient/list')
        })
    } else {
      this.toastr.error('Missing Fields', 'Error In Creation');
      this.scrollUp();
    }
  }

  converPatientFields() {
    this.convertDateToLong()
    this.convertClinicIdsToNumbers()
  }
  convertDateToLong() {
    this.patient.birthDate = Number(moment(this.patient?.birthDate_date).format("x"))
    this.patient.effectiveFromDate = Number(moment(this.patient?.effectiveFromDate_Date).format("x"))
    this.patient.effectiveToDate = Number(moment(this.patient?.effectiveToDate_Date).format("x"))

    _.map(this.patient.patientInsuranceModels, patientInsuranceModel => {
      return patientInsuranceModel.expirationDate = Number(moment(patientInsuranceModel.expirationDate_Date).format("x"))
    });
  }
  convertLongToDate() {
    this.patient.birthDate_date = new Date(moment(this.patient.birthDate).format("MM-DD-YYYY"));
    this.patient.effectiveFromDate_Date = new Date(moment(this.patient.effectiveFromDate).format("MM-DD-YYYY"));
    this.patient.effectiveToDate_Date = new Date(moment(this.patient.effectiveToDate).format("MM-DD-YYYY"));
  }
  convertClinicIdsToNumbers() {
    this.patient.clinicsId = this.patient.clinicsId.map(i => Number(i))
  }

  isPatientFeildsAreValid(): boolean {
    var valid: boolean = true;
    this.resetInvalidFields()
    this.components.forEach(component => {
      if (component instanceof PatientBasicInfoComponent) {
        valid = valid && component.isValid();
        if (!valid)
          component.getInvalidControls().forEach(invalidControl => {
            this.basicInvalidFields.push(invalidControl);
          })
      }

      if (component instanceof PatientIdInfoComponent) {
        valid = valid && component.isValid();
        if (!valid)
          component.getInvalidControls().forEach(invalidControl => {
            this.idInvalidFields.push(invalidControl);
          })
      }
      if (component instanceof ContactComponent) {
        if (this.patient.contacts.length === 0 && component.isValid()) {
          valid = false;
          this.contactInvalidFields.push("Push Contacts(s) Inputs")
        } else if (this.patient.contacts.length === 0) {
          valid = false;
          component.getInvalidControls().forEach(invalidControl => {
            this.contactInvalidFields.push(invalidControl);
          })
        }
      }

      if (component instanceof AddressComponent) {
        if (this.patient.addresses.length === 0 && component.isValid()) {
          valid = false;
          this.addressInvalidFields.push("Push Address(s) Inputs")
        } else if (this.patient.addresses.length === 0) {
          valid = false;
          component.getInvalidControls().forEach(invalidControl => {
            this.addressInvalidFields.push(invalidControl);
          })
        }
      }
      if (component instanceof PatientInsuranceInfoComponent) {
        if (this.patient.patientInsuranceModels.length === 0 && component.isValid()) {
          valid = false;
          this.insuranceInvalidFields.push("Push Insurance(s) Inputs")
        } else if (this.patient.patientInsuranceModels.length === 0) {
          valid = false;
          component.getInvalidControls().forEach(invalidControl => {
            this.insuranceInvalidFields.push(invalidControl);
          })
        }
      }

      if (component instanceof PatientCaseInfoComponent) {
        if (this.patient.cases.length === 0 && component.isValid()) {
          this.caseInvalidFields.push("Push Case(s) Inputs")
          valid = valid && false;
        } else if (this.patient.cases.length === 0) {
          valid = false;
          component.getInvalidControls().forEach(invalidControl => {
            this.caseInvalidFields.push(invalidControl);
          })
        }
      }
    });
    return valid;
  }
  resetInvalidFields() {
    this.basicInvalidFields = [];
    this.idInvalidFields = [];
    this.addressInvalidFields = [];
    this.contactInvalidFields = [];
    this.insuranceInvalidFields = [];
    this.caseInvalidFields = [];
  }
  resetFormComponents() {
    this.components.forEach(component => {
      component.resetForm();
    });
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}
