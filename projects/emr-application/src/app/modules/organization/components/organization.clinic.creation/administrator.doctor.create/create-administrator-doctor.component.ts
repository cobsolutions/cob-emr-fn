import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../../administration/model/user/user';
import { SingleAddressComponent } from '../../../../common/components/single.address/single-address.component';
import { EncryptService } from '../../../../common/service/encyrption/encrypt.service';
import { AdministratorDoctor } from '../../../models/administrator.doctor';
import { DoctorUserService } from '../../../services/doctor.user.autocomplete/doctor-user.service';

@Component({
  selector: 'app-create-administrator-doctor',
  templateUrl: './create-administrator-doctor.component.html',
  styleUrls: ['./create-administrator-doctor.component.css']
})
export class CreateAdministratorDoctorComponent implements OnInit {
  public users: User[];
  administratorDoctor: AdministratorDoctor = {
  }
  errorMessage: string | null;
  isAssignDoctorFromDB: number = -1;;
  isDoctorPicked: boolean = false;
  isValidDoctor: boolean = false;
  @ViewChild('doctorForm') doctorForm: NgForm;
  @ViewChild('clinicAddress') clinicAddress: SingleAddressComponent;
  @Output() closeModal = new EventEmitter<AdministratorDoctor>();
  constructor(private encryptService: EncryptService
    , private doctorUserService: DoctorUserService) { }

  ngOnInit(): void {
    this.doctorUserService.find().subscribe((response) => {
      this.users = response.body;
    })
  }

  pick(event: any) {
    this.isDoctorPicked = true;
    this.administratorDoctor = event;
    this.administratorDoctor.npi = event.doctor.npi;
    this.administratorDoctor.licence = event.doctor.licence;
    this.administratorDoctor.speciality = event.doctor.speciality;
    this.administratorDoctor.credential = event.doctor.credential;
  }
  unpick(event: any) {
    this.administratorDoctor = {}
    this.isDoctorPicked = false;
  }
  saveDoctor() {
    // if (this.checkCreatedDoctor()) {
    //   this.errorMessage = 'Doctor is already exsists';
    // }
    if (this.doctorForm.valid) {
      this.administratorDoctor.password = this.encryptService.encrypt(this.administratorDoctor.password);
      this.isValidDoctor = true;
      this.doctorForm.reset;
      this.errorMessage = null;
      this.closeModal.emit(this.administratorDoctor);
    } else {
      this.errorMessage = 'Invalid data';
      return;
    }
  }
  selectDoctor() {
    this.isValidDoctor = true;
    this.closeModal.emit(this.administratorDoctor);
    this.administratorDoctor = {}
    this.isDoctorPicked = false;
  }
  // private checkCreatedDoctor(): boolean {
  //   var invalid: boolean = false;
  //   this.users.forEach(user => {
  //     if (user.userName === this.administratorDoctor.userName)
  //       invalid = true
  //   });
  //   return invalid;
  // }
}
