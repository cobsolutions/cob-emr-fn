import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableComponent } from '@coreui/angular-pro';
import { IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, map, switchMap, tap } from 'rxjs';
import { Specialties } from '../../../../common/models/enums/doctor/specialties';
import { EncryptService } from '../../../../common/service/encyrption/encrypt.service';
import { Clinic } from '../../../../patient/models/clinic';
import { LoggedInUser } from '../../../../security/model/loggedin.user';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { User } from '../../../model/user/user';
import { UserRoleScope } from '../../../model/user/user.role.scope';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @ViewChild('userCreateForm') userCreateForm: NgForm;
  @ViewChild('userRoles') userRoles: SmartTableComponent;
  submitted: boolean = false;
  validAddress: boolean = true;
  specialties = Specialties;
  credentials: string[];
  clinics: Clinic[];
  isCreated: boolean = true;
  readonly selectedItemsCount = []
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
  user: User = {
    userType: null,
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
  constructor(private clinicService: ClinicService
    , private userService: UserService
    , private toastr: ToastrService
    , private router: Router
    , private encryptService: EncryptService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.checkUserName()
    this.checkEmail();
    this.clinicService.getByOrganizationId(this.loggedInService.getLoggedUser().organizationId)
      .subscribe((response: any) => {
        this.clinics = response.records;
      })
  }
  create() {
    this.fillPermissions()
    if (this.userCreateForm.valid) {
      this.submitted = false;
      if (this.isCreated) {
        var encryptedPassword = this.encryptService.encrypt(this.user.password);
        this.user.password = encryptedPassword
        if (this.user.userType === 'clinical') {
          this.userService.createClinicalUser(this.user).subscribe(result => {
            this.toastr.success('User created');
            this.router.navigateByUrl('emr/administration/list/user')
          }, (error) => {
            console.log(error);
            this.toastr.error(error.error.message, 'Error In Creation');
          })
        }
        if (this.user.userType === 'clerical') {
          this.userService.createClericalUser(this.user).subscribe(result => {
            this.toastr.success('User created');
            this.router.navigateByUrl('emr/administration/list/user')
          }, (error) => {
            console.log(error);
            this.toastr.error(error.error.message, 'Error In Creation');
          })
        }
      } else {
        this, this.userService.update(this.user).subscribe((result) => {
          this.toastr.success('User updated');
          this.router.navigateByUrl('emr/administration/list/user')
        }, (error) => {
          console.log(error);
          this.toastr.error(error.error.message, 'Error In update');
        })
      }

    } else {
      this.submitted = true;
    }
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
    if (this.isValidRoles)
      this.userRoles.items.forEach((item: any) => {
        var userRoleScope: UserRoleScope = {
          role: item.name,
          scope: item.scope
        }
        this.user.roleScope.push(userRoleScope);
      })
  }
  private validateRoles(): boolean {
    for (let i = 0; i < this.userRoles.items.length; i++) {
      var item: any = this.userRoles.items[i];
      if (item.scope === '') {
        return false;
      }
    }
    return true;
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
}

