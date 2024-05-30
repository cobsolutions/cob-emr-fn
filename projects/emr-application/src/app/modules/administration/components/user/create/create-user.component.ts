import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartTableComponent } from '@coreui/angular-pro';
import { IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { Specialties } from '../../../../common/models/enums/doctor/specialties';
import { CacheService } from '../../../../common/service/cahce/cache.service';
import { EncryptService } from '../../../../common/service/encyrption/encrypt.service';
import { Clinic } from '../../../../patient/models/clinic';
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
    { role: 'Patient', scope: '' },
    { role: 'Clinic', scope: '' },
    { role: 'Insurance Company', scope: '' },
    { role: 'Referring Provider', scope: '' },
    { role: 'Patient Payment', scope: '' },
    { role: 'Calendar', scope: '' },
    { role: 'Medical Note-Initialization', scope: '' },
    { role: 'Medical Note-Forward', scope: '' },
    { role: 'Medical Note-Finalization', scope: '' },
  ]
  user: User = {
    userType: null,
    role: null,
    clinics: [],
    doctor: {
      speciality: null,
      credential: null
    },
    roleScope: []
  }
  details_visible = Object.create({});
  scopes: string[] = []
  isValidRoles: boolean
  constructor(private clinicService: ClinicService
    , private cacheService: CacheService
    , private userService: UserService
    , private toastr: ToastrService
    , private router: Router
    , private encryptService: EncryptService
    , private route: ActivatedRoute) { }

  ngOnInit(): void {
    var organizationId: number = Number(localStorage.getItem('org'));
    this.clinicService.getByOrganizationId(organizationId).subscribe((response: any) => {
      this.clinics = response.records;
      var useruuid = this.route.snapshot.paramMap.get('id');
      if (useruuid !== null) {
        this.isCreated = false;
        this.userService.getByUUID(useruuid).subscribe((result: any) => {

          this.user = result;
          this.clinics.forEach(clinic => {
            if (result.clinics.includes(clinic.id.toString()))
              clinic.selected = true;
            else
              clinic.selected = false;
          })
          if (result.doctor !== null)
            this.getDoctorCredentials()
        })
      }
    })
  }
  create() {
    this.fillPermissions()
    if (this.userCreateForm.valid) {
      this.submitted = false;
      if (this.isCreated) {
        var encryptedPassword = this.encryptService.encrypt(this.user.password);
        this.user.password = encryptedPassword
        this.userService.create(this.user).subscribe(result => {
          this.toastr.success('User created');
          this.router.navigateByUrl('emr/administration/list/user')
        }, (error) => {
          console.log(error);
          this.toastr.error(error.error.message, 'Error In Creation');
        })
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
    if (this.user.doctor.speciality === 'Physical_Therapy') {
      this.credentials = ['DPT', 'PTA']
    }
    if (this.user.doctor.speciality === 'Occupational_Therapy') {
      this.credentials = ['OTD', 'COTA']
    }
    if (this.user.doctor.speciality === 'Speech_Language_Pathology') {
      this.credentials = ['SLP', 'SLPA']
    }
    if (this.user.doctor.speciality === 'Dentistry') {
      this.credentials = ['DMD', 'DDS', 'CDA']
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
          role: item.role,
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
}

