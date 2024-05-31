import { Component, Input, OnInit } from '@angular/core';
import { Address, InsuranceCompanyType } from '../../../../common/models';
import { InsuranceCompany } from '../../../model/insurance.company/insurance.company';

@Component({
  selector: 'edit-insurance-company',
  templateUrl: './edit-insurance-company.component.html',
  styleUrls: ['./edit-insurance-company.component.css']
})
export class EditInsuranceCompanyComponent implements OnInit {
  @Input() insuranceCompany: InsuranceCompany
  insuranceCompanytypes = InsuranceCompanyType;
  addresses: Address[];
  constructor() { }

  ngOnInit(): void {
  }
  create() {

  }
  resetError() {

  }
  getInsuranceCompanyAddresses(addresses: any) {
    this.addresses = addresses;
  }
}
