import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
import { IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { switchMap } from 'rxjs';
import { ClinicEmittingService } from '../../../../common/service/emitting/clinic-emitting.service';
import { Clinic } from '../../../../patient/models/clinic';
import { Role } from '../../../../security/model/role';
import { User } from '../../../model/user/user';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { ClinicalUserService } from '../../../services/user/clinical.user/clinical-user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() uuid: string
  @ViewChild('editUserRoles') userRoles: SmartTableComponent;
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
  constructor(private clinicalUserService: ClinicalUserService
    , private clinicEmittingService: ClinicEmittingService
    , private clinicService: ClinicService) { }

  ngOnInit(): void {
    var organizationId: number = Number(localStorage.getItem('org'));
    this.clinicService.getByOrganizationId(organizationId).subscribe((response: any) => {
      this.clinics = response.records;
    })
    this.clinicEmittingService.selectedClinic$.pipe(
      switchMap((clinicID: number) => {
        return this.clinicalUserService.getClericalUser(clinicID, this.uuid)
      })
    ).subscribe(result => {
      this.user = result
      this.populateClinics(this.user)
      this.user.firstName = this.user.fullName.split(',')[0]
      this.user.middleName = this.user.fullName.split(',')[1]
      this.user.lastName = this.user.fullName.split(',')[2]
      this.populateRoles()
    })
  }
  private populateRoles() {
    this.userRoles.items.forEach((item: any) => {
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

}
