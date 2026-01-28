import { Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiSelectComponent, SmartTableComponent } from '@coreui/angular-pro';
import { IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { GenerateRandomValue } from 'projects/emr-application/src/app/util/generate.random';
import { debounceTime, filter, finalize, map, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../../../administration/model/user/user';
import { UserRoleScope } from '../../../administration/model/user/user.role.scope';
import { ClinicService } from '../../../administration/services/clinic/clinic.service';
import { UserService } from '../../../administration/services/user/user.service';
import { Specialties } from '../../../common/models/enums/doctor/specialties';
import { EncryptService } from '../../../common/service/encyrption/encrypt.service';
import { Clinic } from '../../../patient/models/clinic';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { Role } from '../../../security/model/role';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, DoCheck {
  @ViewChild('userCreateForm') userCreateForm: NgForm;
  @ViewChild('generalRolesTable') generalRolesTable: SmartTableComponent;
  @ViewChild('medicalRolesTable') medicalRolesTable: SmartTableComponent;
  @ViewChild('mutliselectClinics') multiSelectComponent: MultiSelectComponent
  submitted: boolean = false;
  validAddress: boolean = true;
  specialties = Specialties;
  credentials: string[];
  @Input() clinics: Clinic[];
  @Input() isOrganizationInit?: boolean = false;
  @Output() pushUser = new EventEmitter<User>()
  isCreated: boolean = true;
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
  showMedicalPermissions: boolean = true;
  user: User = {
    userType: null,
    role: null,
    clinicIds: [],
    roleScope: [],
    speciality: null,
    credential: null
  }
  details_visible = Object.create({});
  scopes: string[] = []
  isValidRoles: boolean
  usernameCtrl = new FormControl();
  emailCtrl = new FormControl();
  validUserName: boolean = undefined;
  validEmail: boolean = undefined;
  validUserNameMessage: string = undefined
  validEmailMessage: string = undefined
  isValidBasicInfo: boolean = false;
  isValidUserType: boolean = false;
  isValidPermissions: boolean = false;
  isValidClinics: boolean = false;
  constructor(private clinicService: ClinicService
    , private userService: UserService
    , private toastr: ToastrService
    , private router: Router
    , private encryptService: EncryptService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.generalRoles$ = of(this.generalRoles);
    this.filteredMedicalRoles = [...this.medicalRoles];
    this.medicalRoles$ = of(this.filteredMedicalRoles);
    this.checkUserName()
    this.checkEmail();
    if (!this.isOrganizationInit)
      this.clinicService.getByOrganizationId(this.loggedInService.getLoggedUser().organizationId)
        .subscribe((response: any) => {
          this.clinics = response.records;
        })
  }
  ngDoCheck(): void {
    this.updateSectionValidation();
  }
  private updateSectionValidation(): void {
    const controls = this.userCreateForm?.form?.controls;
    if (!controls) return;

    // Basic Info: firstName, lastName, email, password, username
    const firstNameValid = controls['firstName']?.valid ?? false;
    const lastNameValid = controls['lastName']?.valid ?? false;
    const passwordValid = controls['password']?.valid ?? false;
    const emailFilled = !!this.user.email;
    const usernameFilled = !!this.user.accountName;
    this.isValidBasicInfo = firstNameValid && lastNameValid && passwordValid && emailFilled && usernameFilled;

    // User Type: role selected, and if Clinical all clinical fields valid
    const roleValid = controls['role']?.valid ?? false;
    if (this.user.userType === 'Clinical') {
      const npiValid = controls['npi']?.valid ?? false;
      const licenceValid = controls['licence']?.valid ?? false;
      const specialityValid = controls['speciality']?.valid ?? false;
      const credentialValid = controls['credential']?.valid ?? false;
      this.isValidUserType = roleValid && npiValid && licenceValid && specialityValid && credentialValid;
    } else {
      this.isValidUserType = roleValid;
    }

    // Permissions: all roles have a scope assigned
    const generalValid = this.generalRolesTable?.items?.every((item: any) => item.scope !== '') ?? false;
    if (this.showMedicalPermissions) {
      const medicalValid = this.medicalRolesTable?.items?.every((item: any) => item.scope !== '') ?? false;
      this.isValidPermissions = generalValid && medicalValid;
    } else {
      this.isValidPermissions = generalValid;
    }

    // Clinics: at least one clinic selected
    this.isValidClinics = this.user.clinicIds?.length > 0;
  }
  create() {
    this.fillPermissions()
    if (this.userCreateForm.valid) {
      this.submitted = false;
      if (this.isOrganizationInit)
        this.createOrganizationInitUser()
      else
        this.createUser();
    } else {
      this.submitted = true;
    }
  }
  checkUserName() {
    this.usernameCtrl.valueChanges
      .pipe(
        filter(text => {
          if (text === '') {
            this.validUserName = undefined;
            return false;
          }
          if (text === undefined) {
            return false;
          }
          if (text.length > 1) {
            return true
          } else {
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
        }),
        switchMap((value) => {
          return this.userService.checkUserName(value)
            .pipe(
              finalize(() => {
              }),
            )
        }
        )
      ).subscribe((check: any) => {
        this.validUserName = check;
        if (!check) {
          this.validUserNameMessage = 'username is already exists';
        }
      },
        error => {
        });
  }
  checkEmail() {
    this.emailCtrl.valueChanges
      .pipe(
        filter(text => {
          if (text === '') {
            this.validEmail = undefined;
            return false;
          }
          if (text === undefined) {
            return false;
          }
          if (text.length > 1) {
            return true
          } else {
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
        }),
        switchMap((value) => {
          return this.userService.checkEmail(value)
            .pipe(
              finalize(() => {
              }),
            )
        }
        )
      ).subscribe((check: any) => {
        this.validEmail = check;
        if (!check) {
          this.validEmailMessage = 'Email is already exists';
        }
      },
        error => {
        });
  }
  resetError() {
    this.submitted = false;
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
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  private fillPermissions() {
    this.isValidRoles = this.validateRoles();
    if (this.isValidRoles) {
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
  private validateRoles(): boolean {
    for (let i = 0; i < this.generalRolesTable.items.length; i++) {
      var item: any = this.generalRolesTable.items[i];
      if (item.scope === '') {
        return false;
      }
    }
    if (this.showMedicalPermissions) {
      for (let i = 0; i < this.medicalRolesTable.items.length; i++) {
        var item: any = this.medicalRolesTable.items[i];
        if (item.scope === '') {
          return false;
        }
      }
    }
    return true;
  }
  private createOrganizationInitUser() {

    this.user.password = this.encryptService.encrypt(this.user.password);
    this.pushUser.emit(this.user)
    this.userCreateForm.reset();
    this.usernameCtrl.setValue('')
    this.emailCtrl.setValue('')
    this.validUserName = undefined;
    this.validEmail = undefined;
    this.user.roleScope = []
    this.user.clinicIds = undefined;
  }
  private createUser() {
    if (this.isCreated) {
      var encryptedPassword = this.encryptService.encrypt(this.user.password);
      this.user.password = encryptedPassword
      if (this.user.userType === 'Clinical') {
        this.userService.createClinicalUser(this.user).subscribe(result => {
          this.toastr.success('User created');
          this.router.navigateByUrl('emr/users/list/clinical/users')
        }, (error) => {
          console.log(error);
          this.toastr.error(error.error.message, 'Error In Creation');
        })
      }
      if (this.user.userType === 'Clerical') {
        this.userService.createClericalUser(this.user).subscribe(result => {
          this.toastr.success('User created');
          this.router.navigateByUrl('emr/users/list/clerical/users')
        }, (error) => {
          console.log(error);
          this.toastr.error(error.error.message, 'Error In Creation');
        })
      }
    } else {
      this, this.userService.update(this.user).subscribe((result) => {
        this.toastr.success('User updated');
        this.router.navigateByUrl('emr/users/list/clerical/users')
      }, (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Error In update');
      })
    }
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
