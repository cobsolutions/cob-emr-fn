import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
import { IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { map, switchMap } from 'rxjs';
import { Specialties } from '../../../../common/models/enums/doctor/specialties';
import { Clinic } from '../../../../patient/models/clinic';
import { LoggedInUser } from '../../../../security/model/loggedin.user';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
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
    , private loggedInService: LoggedInService
    , private clinicService: ClinicService
    , private clinicalUserService: DotorUserService) { }

  ngOnInit(): void {
    this.loggedInService.load().pipe(
      map((loggedInUser: LoggedInUser) => {
        return loggedInUser.organizationId
      })
      , switchMap((organizationId: number) => {
        return this.clinicService.getByOrganizationId(organizationId)
      })
    )
      .subscribe((response: any) => {
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
    this.loggedInService.selectedClinic$.pipe(
      switchMap((clinicID: number) => {
        return this.clericalUSerService.getClericalUser(clinicID, this.uuid)
      })
    ).subscribe(result => {
      this.populateUser(result)
    })
  }
  private fetchClinicalUser() {
    this.loggedInService.selectedClinic$.pipe(
      switchMap((clinicID: number) => {
        return this.clinicalUserService.getClinicalUser(clinicID, this.uuid)
      })
    ).subscribe(result => {
      console.log(JSON.stringify(result))
      this.populateUser(result)
    })
  }
  private populateUser(result: any) {
    this.user = result;
    
    this.populateClinics(this.user)
    this.populateRoles()
    this.getDoctorCredentials()
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
