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
  @Input() componentRole: string[]
  @ViewChild('generalRolesTable') generalRolesTable: SmartTableComponent;
  @ViewChild('medicalRolesTable') medicalRolesTable: SmartTableComponent;
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
  generalRoles: IItem[] = [
    { role: 'Patient', scope: '', name: 'emr-patient-role' },
    { role: 'Clinic', scope: '', name: 'clinic-role' },
    { role: 'User', scope: '', name: 'user-role' },
    { role: 'Insurance Company', scope: '', name: 'insurance-company-role' },
    { role: 'Referring Provider', scope: '', name: 'emr-referring-provider-role' },
    { role: 'Patient Payment', scope: '', name: 'patient-payment-role' },
    { role: 'Calendar', scope: '', name: 'calendar-role' },
  ]
  medicalRoles: IItem[] = [
    { role: 'Medical Note-Initialization', scope: '', name: 'initialize-medical-note-role' },
    { role: 'Medical Note-Forward', scope: '', name: 'forward-medical-note-role' },
    { role: 'Medical Note-Finalization', scope: '', name: 'finalize-medical-note-role' },
  ]
  filteredMedicalRoles: IItem[] = [];
  generalRoles$: Observable<IItem[]>
  medicalRoles$: Observable<IItem[]>
  showMedicalPermissions: boolean = false;
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
    this.showMedicalPermissions = this.userType === 'Clinical';
    this.generalRoles$ = of(this.generalRoles);
    this.filteredMedicalRoles = [...this.medicalRoles];
    this.medicalRoles$ = of(this.filteredMedicalRoles);
    this.clinicService.getByOrganizationId(this.loggedInService.getLoggedUser().organizationId)
      .subscribe((response: any) => {
        console.log(response.records)
        this.clinics = response.records;
        this.fetchUser();
      })
  }
  private fetchUser() {
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
    this.generalRolesTable.items.forEach((item: any) => {
      var scope: any = this.user.roleScope.find(roleScope => roleScope.role === item.name)?.scope;
      if (scope === 'true')
        item.scope = true
      else if (scope === 'false')
        item.scope = false
      else if (scope)
        item.scope = scope
    });
    if (this.showMedicalPermissions) {
      this.medicalRolesTable.items.forEach((item: any) => {
        var scope: any = this.user.roleScope.find(roleScope => roleScope.role === item.name)?.scope;
        // Medical roles use 'modify'/'hidden' values - convert to boolean for toggle
        item.scope = scope === 'modify';
      });
    }
  }
  private populateClinics(user: User) {
    console.log(this.clinics)
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
      this.generalRolesTable.items.forEach((item: any) => {
        var userRoleScope: UserRoleScope = {
          role: item.name,
          scope: item.scope
        };
        this.user.roleScope.push(userRoleScope);
      });
      if (this.showMedicalPermissions) {
        this.medicalRolesTable.items.forEach((item: any) => {
          var userRoleScope: UserRoleScope = {
            role: item.name,
            scope: item.scope ? 'modify' : 'hidden'
          };
          this.user.roleScope.push(userRoleScope);
        });
      }
    }
  }
  isClinicTouched(event: any) {
    this.isClinicChanged = true;
  }
  changeCredential(value: any) {
    if (value === 'SPT' || value === 'SOT' || value === 'SSLP') {
      this.filteredMedicalRoles = this.medicalRoles.filter(
        (item: any) => {
          return item.name !== Role.FINALIZE_MEDICAL_NOTE_ROLE
        }
      );
    } else {
      this.filteredMedicalRoles = [...this.medicalRoles];
    }
    this.medicalRoles$ = of(this.filteredMedicalRoles);
  }
  changeUSerType(value: any) {
    this.showMedicalPermissions = value === 'Clinical';
  }
}
