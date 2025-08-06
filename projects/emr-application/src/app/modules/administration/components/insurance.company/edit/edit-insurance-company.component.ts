import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';
import { AddressComponent } from '../../../../common/components/address/address.component';
import { Address, InsuranceCompanyType } from '../../../../common/models';
import { LoggedInUser } from '../../../../security/model/loggedin.user';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { InsuranceCompany } from '../../../model/insurance.company/insurance.company';
import { InsuranceCompanyService } from '../../../services/insurance.company/insurance-company.service';

@Component({
  selector: 'edit-insurance-company',
  templateUrl: './edit-insurance-company.component.html',
  styleUrls: ['./edit-insurance-company.component.css']
})
export class EditInsuranceCompanyComponent implements OnInit {
  @Input() insuranceCompany: InsuranceCompany
  @ViewChild('editInsuranceCompanyForm') editInsuranceCompanyForm: NgForm;
  @ViewChild('editAddresInsuranceCompany') editAddresInsuranceCompany: AddressComponent
  @Output() changeVisibility = new EventEmitter<string>()
  insuranceCompanytypes = InsuranceCompanyType;
  addresses: Address[];
  validForm: boolean = false;
  validAddress: boolean = true;
  constructor(private toastr: ToastrService
    , private insuranceCompanyService: InsuranceCompanyService
    , private loggedInService: LoggedInService
    , private router: Router) { }

  ngOnInit(): void {
  }
  update() {
    if (this.editInsuranceCompanyForm.valid && this.isValidAddress()) {
      this.changeVisibility.emit('close');
      this.insuranceCompany.organizationId = this.loggedInService.getLoggedUser().organizationId;
      this.insuranceCompanyService.create(this.insuranceCompany)
        .subscribe(() => {
          this.editInsuranceCompanyForm.reset();
          this.toastr.success('Insurance Company Update.');
          this.editAddresInsuranceCompany.addresses = [];
        })
    } else {

      this.validForm = true
    }
  }
  resetError() {

  }
  getInsuranceCompanyAddresses(addresses: any) {
    this.insuranceCompany.addresses = addresses;
  }
  private isValidAddress(): boolean {
    if (this.insuranceCompany.addresses !== undefined && this.insuranceCompany.addresses.length > 0)
      this.validAddress = true
    else
      this.validAddress = false;
    return this.validAddress;
  }
}
