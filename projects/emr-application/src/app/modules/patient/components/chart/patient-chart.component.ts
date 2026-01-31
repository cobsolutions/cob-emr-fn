import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AddressUtil } from 'projects/emr-application/src/app/util/address.util';
import { PatientName } from 'projects/emr-application/src/app/util/name.util';
import { filter, Subscription, switchMap, tap } from 'rxjs';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { MedialNoteService } from '../../services/medical.note/medial-note.service';
import { PatientCase } from '../../models/case/patient.case';
import { PatientChartInfo } from '../../models/chart/patient.chart.info';
import { PatientRequest } from '../../models/medical.note/requester/patient.request';
import { Patient } from '../../models/patient';
import { PateintResponse } from '../../models/response/patient.response';
import { PateintCaseService } from '../../services/patient/cases/pateint-case.service';
import { PatientFinderService } from '../../services/patient/patient-finder.service';

@Component({
  selector: 'app-patient-chart',
  templateUrl: './patient-chart.component.html',
  styleUrls: ['./patient-chart.component.css']
})
export class PatientChartComponent implements OnInit, OnDestroy {
  patient:PatientRequest
  private draftSub!: Subscription;
  patientChartInfo: PatientChartInfo = {
    id: 0,
    name: '',
    dateOfBirth: '',
    age: 0,
    gender: '',
    address: [],
    email: '',
    phone: '',
    insurance: '',
    emrId: '',
    patientStatus: ''
  };
  patientCases: PatientCase[];
  patientId: number;
  caseId: number = 0;
  clinicId: number;
  selectedIndex = 0;  // Default to first tab
  showFullAddress = false;
  activeTabIndex = 0;

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }
  Templat
  toggleAddress() {
    this.showFullAddress = !this.showFullAddress;
  }
  constructor(private route: ActivatedRoute
    , private patientFinderService: PatientFinderService
    , private pateintCaseService: PateintCaseService
    , private loggedInService: LoggedInService
    , private router: Router
    , private medialNoteService: MedialNoteService) { }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId'))
    this.loggedInService.selectedClinic$
      .pipe(
        filter(clinicId => clinicId != null),
        tap((clinicId) => this.clinicId = clinicId),
        switchMap((clinicId) => this.patientFinderService.getPatient(this.patientId, clinicId)))
      .subscribe((response: PateintResponse) => {
        this.updatePatientData(response);
      }, error => {
        this.router.navigate(['/emr/patient/list']);
      })

    this.draftSub = this.medialNoteService.draft$.subscribe(() => {
      this.refreshPatientData();
    });
  }

  ngOnDestroy(): void {
    this.draftSub?.unsubscribe();
  }

  private refreshPatientData(): void {
    if (this.clinicId) {
      this.patientFinderService.getPatient(this.patientId, this.clinicId)
        .subscribe((response: PateintResponse) => {
          this.updatePatientData(response);
        });
    }
  }

  private updatePatientData(response: PateintResponse): void {
    var patient: Patient = response.records
    this.patient = {
      firstName: patient.firstName,
      middleName: patient.middleName,
      lastName: patient.lastName,
      patientId: patient.uuid,
      dateOfBirth: new Date(patient.birthDate)
    }
    this.patientCases = patient.cases;
    this.patientChartInfo.name = PatientName.formatName(patient.firstName, patient.middleName, patient.lastName);
    this.patientChartInfo.dateOfBirth = moment(patient.birthDate).format("MM-DD-YYYY");
    this.patientChartInfo.email = patient.contacts[0].email;
    this.patientChartInfo.phone = patient.contacts[0].phoneNumber;
    this.patientChartInfo.gender = patient.gender
    this.patientChartInfo.address = [];
    for (var i = 0; i < patient.addresses.length; i++) {
      this.patientChartInfo.address.push(AddressUtil.formatAddress(patient.addresses[i]))
    }
    this.patientChartInfo.age = moment().diff(patient.birthDate, 'years');
    this.patientChartInfo.insurance = patient.patientInsuranceModels?.[0]?.insuranceCompany?.name || '';
    this.patientChartInfo.emrId = patient.emrId || '';
    this.patientChartInfo.patientStatus = patient.patientStatus || '';
  }
  selectTab(index: number) {
    this.selectedIndex = index;
  }
  changeCase(event: any) {
    var caseId: number = event.target.value;
    if (caseId !== null)
      this.pateintCaseService.selectedCase$.next(caseId);
  }
}
