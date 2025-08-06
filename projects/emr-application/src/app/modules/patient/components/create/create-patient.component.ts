import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BasicComponent } from 'projects/emr-application/src/app/util/basic.component';
import { catchError, EMPTY } from 'rxjs';
import { AddressComponent } from '../../../common/components/address/address.component';
import { ContactComponent } from '../../../common/components/contact/contact.component';
import { Role } from '../../../security/model/role';
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
  @Input() mode: string;
  @Output() changeVisibility = new EventEmitter<string>()
  valid: boolean = true;
  isValidPatientCase: boolean = true;
  isValidPatientInsurance: boolean = true;
  isValidPatientAddress: boolean = true;
  isValidPatientContact: boolean = true;
  isValidPatientInformation: boolean = true;
  isValidPatientIdentification: boolean = true;
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
  componentRole: string[] = [Role.PATIENT_ROLE ];
  constructor(private toastr: ToastrService,
    private patientCreationService: PatientCreationService,
    private router: Router) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    if (this.selectedPatient) {
      this.patient = this.selectedPatient;
      this.convertLongToDate();
    }
  }


  create() {
    this.isPatientFeildsAreValid();
    if (this.valid) {
      switch (this.mode) {
        case 'update':
          this.updatePatient();
          break;
        default:
          this.createPatient();
      }

    }
  }
  private createPatient() {
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
        this.toastr.success('Pateint Created.');
        this.router.navigateByUrl('emr/patient/list')
      })
  }
  private updatePatient() {
    this.convertDateToLong()
    this.patientCreationService.update(this.patient).subscribe(result => {
      this.changeVisibility.emit('close');
      this.toastr.success('Pateint update.');
    }, error => {
      this.toastr.error('Error during update patient.');
    })
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

  isPatientFeildsAreValid() {
    this.resetInvalidFields()
    this.components.forEach(component => {
      if (component instanceof PatientBasicInfoComponent) {
        this.isValidPatientInformation = component.isValid();
      }
      if (component instanceof PatientIdInfoComponent) {
        this.isValidPatientIdentification = component.isValid();
      }
      if (component instanceof ContactComponent) {
        this.isValidPatientContact = !(this.patient.contacts.length === 0)
      }

      if (component instanceof AddressComponent) {
        this.isValidPatientAddress = !(this.patient.addresses.length === 0)
      }
      if (component instanceof PatientInsuranceInfoComponent) {
        this.isValidPatientInsurance = !(this.patient.patientInsuranceModels.length === 0)
      }
      if (component instanceof PatientCaseInfoComponent) {
        this.isValidPatientCase = !(this.patient.cases.length === 0)
      }
    });
    this.valid = this.isValidPatientCase && this.isValidPatientInsurance && this.isValidPatientAddress && this.isValidPatientContact && this.isValidPatientInformation && this.isValidPatientIdentification
  }
  resetInvalidFields() {
    this.basicInvalidFields = [];
    this.idInvalidFields = [];
    this.addressInvalidFields = [];
    this.contactInvalidFields = [];
    this.insuranceInvalidFields = [];
    this.caseInvalidFields = [];
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
