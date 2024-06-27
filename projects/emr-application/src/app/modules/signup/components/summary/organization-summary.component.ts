import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Clinic } from '../../../patient/models/clinic';
import { Organization } from '../../model/organization';

@Component({
  selector: 'organization-summary',
  templateUrl: './organization-summary.component.html',
  styleUrls: ['./organization-summary.component.css']
})
export class OrganizationSummaryComponent implements OnInit {
  @Input() form: FormGroup;
  organization: Organization = {}

  constructor() { }

  ngOnInit(): void {
    this.fillEsstenialInfo();
    this.fillClinics();
    this.fillAdministratorUser();
    this.fillUsers();
  }
  submit() {
    console.log(JSON.stringify(this.form.value))
  }
  private fillEsstenialInfo() {
    this.form.get('essential').valueChanges.forEach(selected => {
      this.organization.orgname = selected?.orgname
      this.organization.dba = selected?.dba
      this.organization.groupNPI = selected?.groupNPI
      this.organization.taxID = selected?.taxID
      this.organization.firstAddress = selected?.firstAddress
      this.organization.secondAddress = selected?.secondAddress
      this.organization.state = selected?.state
      this.organization.city = selected?.city
      this.organization.zipCode = selected?.zipCode
    })
  }
  private fillClinics() {
    this.form.get('clinics').valueChanges.forEach(selected => {
      this.organization.clinics = selected;
    })
  }
  private fillAdministratorUser() {
    this.form.get('administrator').valueChanges.forEach(selected => {
      this.organization.administrator = selected;
    })
  }
  private fillUsers() {
    this.form.get('users').valueChanges.forEach(selected => {
      console.log(JSON.stringify(selected))
      this.organization.users = selected;
    })
  }
  get organizationAddress() {
    var address = this.organization.firstAddress + ',' +
      (this.organization.secondAddress ? this.organization.firstAddress : '') + ',' + this.organization.state + ',' + this.organization.city + ',' + this.organization.zipCode
    return address;
  }
}
