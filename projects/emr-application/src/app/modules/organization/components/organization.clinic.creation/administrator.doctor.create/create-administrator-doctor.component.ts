import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../../administration/model/user/user';
import { UserRoleScope } from '../../../../administration/model/user/user.role.scope';
import { DotorUserService } from '../../../../administration/services/user/doctor.user/dotor-user.service';
import { SingleAddressComponent } from '../../../../common/components/single.address/single-address.component';
import { EncryptService } from '../../../../common/service/encyrption/encrypt.service';
import { Role } from '../../../../security/model/role';
import { AdministratorDoctor } from '../../../models/administrator.doctor';
import { OrganizationService } from '../../../services/organization.service';


@Component({
  selector: 'app-create-administrator-doctor',
  templateUrl: './create-administrator-doctor.component.html',
  styleUrls: ['./create-administrator-doctor.component.css']
})
export class CreateAdministratorDoctorComponent implements OnInit {
  public users: Observable<User[]>;
  administratorDoctor: AdministratorDoctor = {
    roleScope: []
  }
  errorMessage: string | null;
  isAssignDoctorFromDB: number = -1;;
  isDoctorPicked: boolean = false;
  isValidDoctor: boolean = false;
  @ViewChild('doctorForm') doctorForm: NgForm;
  @ViewChild('clinicAddress') clinicAddress: SingleAddressComponent;
  @Output() closeModal = new EventEmitter<AdministratorDoctor>();
  constructor(private encryptService: EncryptService
    , private clinicalService: DotorUserService
    , private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.users = this.clinicalService.getAllClinicalsUsers();
  }

  pick(event: any) {
    this.isDoctorPicked = true;
    this.administratorDoctor = event;
    this.administratorDoctor.npi = event.npi;
    this.administratorDoctor.licence = event.licence;
    this.administratorDoctor.speciality = event.speciality;
    this.administratorDoctor.credential = event.credential;
    var name: string[] = this.administratorDoctor.fullName.split(',');
    console.log(name)
    this.administratorDoctor.firstName = name[0]
    this.administratorDoctor.middleName = name[1]
    this.administratorDoctor.lastName = name[2]
  }
  unpick(event: any) {
    this.administratorDoctor = {}
    this.isDoctorPicked = false;
  }
  saveDoctor() {
    if (this.doctorForm.valid) {
      var roleScope: UserRoleScope = {
        role: Role.ADMIN_ROLE,
        scope: ''
      }
      this.administratorDoctor.roleScope.push(roleScope);
      this.administratorDoctor.password = this.encryptService.encrypt(this.administratorDoctor.password);
      this.isValidDoctor = true;
      this.doctorForm.reset;
      this.errorMessage = null;
      this.closeModal.emit(this.administratorDoctor);
      this.organizationService.adminDoctor$.next(this.administratorDoctor)
    } else {
      this.errorMessage = 'Invalid data';
      return;
    }
  }
  selectDoctor() {
    var roleScope: UserRoleScope = {
      role: Role.ADMIN_ROLE,
      scope: ''
    }
    this.administratorDoctor.roleScope.push(roleScope)
    this.isValidDoctor = true;
    this.closeModal.emit(this.administratorDoctor);
    this.administratorDoctor = {}
    this.isDoctorPicked = false;
    this.organizationService.adminDoctor$.next(this.administratorDoctor)
  }
}
