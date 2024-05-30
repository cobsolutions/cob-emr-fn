import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
import { IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { switchMap } from 'rxjs';
import { Specialties } from '../../../../common/models/enums/doctor/specialties';
import { ClinicEmittingService } from '../../../../common/service/emitting/clinic-emitting.service';
import { Clinic } from '../../../../patient/models/clinic';
import { Role } from '../../../../security/model/role';
import { User } from '../../../model/user/user';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { ClinicalUserService } from '../../../services/user/clinical.user/clinical-user.service';
import { DotorUserService } from '../../../services/user/doctor.user/dotor-user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() uuid: string
  @Input() userType: string
  @ViewChild('editUserRoles') editUserRoles: SmartTableComponent;
  user: User
  clinics: Clinic[];
  columns = [
    {
      key: 'role',
      label: 'Permission',
      _style: { width: '70%' }
    },
    { key: 'scope', label: 'Scope', _style: { width: '30%' } },
  ];
  roles: IItem[] = [
    { role: 'Patient', scope: '', name: 'emr-patient-role' },
    { role: 'Clinic', scope: '', name: 'clinic-role' },
    { role: 'Insurance Company', scope: '', name: 'insurance-company-role' },
    { role: 'Referring Provider', scope: '', name: 'referring-provider-role' },
    { role: 'Patient Payment', scope: '', name: 'patient-payment-role' },
    { role: 'Calendar', scope: '', name: 'calendar-role' },
    { role: 'Medical Note-Initialization', scope: '', name: 'initialize-medical-note-role' },
    { role: 'Medical Note-Forward', scope: '', name: 'forward-medical-note-role' },
    { role: 'Medical Note-Finalization', scope: '', name: 'finalize-medical-note-role' },
  ]
  credentials: string[];
  specialties = Specialties;
  constructor(private clericalUSerService: ClinicalUserService
    , private clinicEmittingService: ClinicEmittingService
    , private clinicService: ClinicService
    , private clinicalUserService: DotorUserService) { }

  ngOnInit(): void {
    var organizationId: number = Number(localStorage.getItem('org'));
    this.clinicService.getByOrganizationId(organizationId).subscribe((response: any) => {
      this.clinics = response.records;
    })
    switch (this.userType) {
      case 'Clinical':
        this.fetchClinicalUser();
        break;
      case 'Clerical':
        this.fetchClericalUser();
        break;
    }
  }

  private fetchClericalUser() {
    this.clinicEmittingService.selectedClinic$.pipe(
      switchMap((clinicID: number) => {
        return this.clericalUSerService.getClericalUser(clinicID, this.uuid)
      })
    ).subscribe(result => {
      this.populateUser(result)
    })
  }
  private fetchClinicalUser() {
    this.clinicEmittingService.selectedClinic$.pipe(
      switchMap((clinicID: number) => {
        return this.clinicalUserService.getClinicalUser(clinicID, this.uuid)
      })
    ).subscribe(result => {
      this.populateUser(result)
    })
  }
  private populateUser(result: any) {
    this.user = result;
    this.populateUserName();
    this.populateClinics(this.user)
    this.populateRoles()
    this.getDoctorCredentials()
  }
  private populateUserName() {

    this.user.firstName = this.user.fullName.split(',')[0]
    this.user.middleName = this.user.fullName.split(',')[1]
    this.user.lastName = this.user.fullName.split(',')[2]
  }
  private populateRoles() {
    this.editUserRoles.items.forEach((item: any) => {
      item.scope = this.user.roleScope.find(roleScope => roleScope.role === item.name).scope;
    })
  }
  private populateClinics(user: User) {
    this.clinics.forEach(clinic => {
      if (user.clinicIds.includes(Number(clinic.id)))
        clinic.selected = true;
      else
        clinic.selected = false;
    })
  }
  getDoctorCredentials() {
    if (this.user.speciality === 'Physical_Therapy') {
      this.credentials = ['DPT', 'PTA']
    }
    if (this.user.speciality === 'Occupational_Therapy') {
      this.credentials = ['OTD', 'COTA']
    }
    if (this.user.speciality === 'Speech_Language_Pathology') {
      this.credentials = ['SLP', 'SLPA']
    }
    if (this.user.speciality === 'Dentistry') {
      this.credentials = ['DMD', 'DDS', 'CDA']
    }
  }
}
