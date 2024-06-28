import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
import { IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, of, switchMap } from 'rxjs';
import { User } from '../../../administration/model/user/user';
import { UserRoleScope } from '../../../administration/model/user/user.role.scope';
import { ClinicService } from '../../../administration/services/clinic/clinic.service';
import { UserService } from '../../../administration/services/user/user.service';
import { Specialties } from '../../../common/models/enums/doctor/specialties';
import { Clinic } from '../../../patient/models/clinic';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { Role } from '../../../security/model/role';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { ClericlaUserService } from '../../services/clerical/clericla-user.service';
import { ClinicalUserService } from '../../services/clinical/clinical-user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() uuid: string
  @Input() userType: string
  @Input()componentRole: string[]
  @ViewChild('editUserRoles') editUserRoles: SmartTableComponent;
  @Output() changeVisibility = new EventEmitter<string>()
  isValidRoles: boolean = true;
  isValidClinic: boolean = true;
  isClinicChanged: boolean = false
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
    { role: 'User', scope: '', name: 'user-role' },
    { role: 'Insurance Company', scope: '', name: 'insurance-company-role' },
    { role: 'Referring Provider', scope: '', name: 'emr-referring-provider-role' },
    { role: 'Patient Payment', scope: '', name: 'patient-payment-role' },
    { role: 'Calendar', scope: '', name: 'calendar-role' },
    { role: 'Medical Note-Initialization', scope: '', name: 'initialize-medical-note-role' },
    { role: 'Medical Note-Forward', scope: '', name: 'forward-medical-note-role' },
    { role: 'Medical Note-Finalization', scope: '', name: 'finalize-medical-note-role' },
  ]
  filteredRoles: IItem[] = [];
  roles$: Observable<IItem[]>
  credentials: string[];
  specialties = Specialties;
  constructor(
    private loggedInService: LoggedInService
    , private clinicService: ClinicService
    , private toastr: ToastrService
    , private userService: UserService
    , private clinicalUserService: ClinicalUserService
    , private clericlaUserService: ClericlaUserService) { }

  ngOnInit(): void {
    this.filteredRoles = [...this.roles];
    this.roles$ = of(this.filteredRoles)
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
    this.clericlaUserService.getClericalUser(this.uuid)
      .subscribe(result => {
        this.populateUser(result)
      })
  }

  private fetchClinicalUser() {
    this.clinicalUserService.getClinicalUser(this.uuid)
      .subscribe(result => {
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
      var scope:string = this.user.roleScope.find(roleScope => roleScope.role === item.name).scope
      item.scope = scope
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
      this.credentials = ['PT', 'SPT', 'PTA']
    }
    if (this.user.speciality === 'Occupational_Therapy') {
      this.credentials = ['OT', 'SOT', 'COTA']
    }
    if (this.user.speciality === 'Speech_Language_Pathology') {
      this.credentials = ['SLP', 'SSLP', 'SLPA']
    }
  }
  update() {
    this.isValidClinic = this.user.clinicIds.length > 0
    this.fillPermissions()
    this.user.isClinicChanged = this.isClinicChanged;
    if (this.isValidRoles && this.isValidClinic) {
      switch (this.userType) {
        case 'Clinical':
          this.updateClinicalUser();
          break;
        case 'Clerical':
          this.updateClericalUser();
          break;
      }
      this.changeVisibility.emit('close');
    }
  }
  updateClinicalUser() {
    this.userService.updateClinicalUser(this.user).subscribe(result => {
      this.toastr.success('User Updated');
    }, error => {
      this.toastr.error('Error In Udpate');
    })
  }
  updateClericalUser() {
    this.userService.updateClericalUser(this.user).subscribe(result => {
      this.toastr.success('User Updated');
    }, error => {
      this.toastr.error('Error In Udpate');
    })
  }
  private fillPermissions() {
    if (this.isValidRoles) {
      this.user.roleScope = []
      this.editUserRoles.items.forEach((item: any) => {
        var userRoleScope: UserRoleScope = {
          role: item.name,
          scope: item.scope
        }
        this.user.roleScope.push(userRoleScope);
      })
    }
  }
  isClinicTouched(event: any) {
    this.isClinicChanged = true;
  }
  changeCredential(value: any) {

    if (value === 'SPT' || value === 'SOT' || value === 'SSLP') {
      this.filteredRoles = this.roles.filter(
        (item: any) => {
          return item.name !== Role.FINALIZE_MEDICAL_NOTE_ROLE
        }
      );
    } else {
      this.filteredRoles = [...this.roles];
    }
    this.roles$ = of(this.filteredRoles)
  }
  changeUSerType(value: any) {
    if (value === 'Clerical') {
      this.filteredRoles = this.roles.filter(
        (item: any) => {
          return item.name !== Role.FORWARD_MEDICAL_NOTE_ROLE && item.name !== Role.INITIALIZE_MEDICAL_NOTE_ROLE && item.name !== Role.FINALIZE_MEDICAL_NOTE_ROLE
        }
      );
    } else {
      this.filteredRoles = [...this.roles];
    }
    this.roles$ = of(this.filteredRoles)
  }
}
