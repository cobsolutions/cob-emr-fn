import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../administration/model/user/user';
import { Clinic } from '../../../patient/models/clinic';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input() form: FormGroup;
  users: User[] = []
  clinics: Observable<Clinic[]>
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    var formClinics = this.form.get('clinics') as FormArray
    this.clinics = formClinics.valueChanges
  }
  get organizationUsers(): FormArray {
    return this.form.get('users') as FormArray;
  }

  handleCreatedUser(user: User) {
    const copy = structuredClone(user)
    this.users.push(copy)
    this.pushUserToForm(copy)
  }
  pushUserToForm(user: User) {
    const addedUser = this.fb.group({
      firstName: [user.firstName],
      middleName: [user.middleName],
      lastName: [user.lastName],
      accountName: [user.accountName],
      email: [user.email],
      password: [user.password],
      clinicIds: [user.clinicIds],
      userType: [user.userType],
      roleScope: [user.roleScope],
      npi: [user.npi],
      licence: [user.licence],
      speciality: [user.speciality],
      credential: [user.credential]
    })
    this.organizationUsers.push(addedUser);
  }
  remove(item) {

  }
}
