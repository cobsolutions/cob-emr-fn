import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address, InsuranceCompanyType } from '../../../../common/models';
import { InsuranceCompany } from '../../../model/insurance.company/insurance.company';

@Component({
  selector: 'edit-insurance-company',
  templateUrl: './edit-insurance-company.component.html',
  styleUrls: ['./edit-insurance-company.component.css']
})
export class EditInsuranceCompanyComponent implements OnInit {
  @Input() insuranceCompany: InsuranceCompany
  @ViewChild('editInsuranceCompanyForm') clinicCreateForm: NgForm;
  insuranceCompanytypes = InsuranceCompanyType;
  addresses: Address[];
  submitted: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  update() {
    if(this.clinicCreateForm.valid){
      this.submitted  = false
    }else{
      this.submitted  = true
    }
  }
  resetError() {

  }
  getInsuranceCompanyAddresses(addresses: any) {
    this.addresses = addresses;
  }
}
