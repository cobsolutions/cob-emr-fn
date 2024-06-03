import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';
import { AddressComponent } from '../../../../common/components/address/address.component';
import { Address, InsuranceCompanyType } from '../../../../common/models';
import { LoggedInUser } from '../../../../security/model/loggedin.user';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { InsuranceCompany } from '../../../model/insurance.company/insurance.company';
import { InsuranceCompanyService } from '../../../services/insurance.company/insurance-company.service';

@Component({
  selector: 'app-create-insurance-company',
  templateUrl: './create-insurance-company.component.html',
  styleUrls: ['./create-insurance-company.component.css']
})
export class CreateInsuranceCompanyComponent implements OnInit {
  @ViewChild('insuranceCompanyCreateForm') insuranceCompanyCreateForm: NgForm;
  @ViewChild('addressComp') addpressComp: AddressComponent;
  insuranceCompanytypes = InsuranceCompanyType;
  addresses: Address[];
  insuranceCompany: InsuranceCompany = {
    id: null,
    name: null,
    insuranceType: null,
    phone: null,
    fax: null,
    addresses: [],
  }
  errorMessage: string | null;
  submitted: boolean;
  clinicId: number;
  constructor(private toastr: ToastrService,
    private insuranceCompanyService: InsuranceCompanyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private loggedInService: LoggedInService) {
  }
  ngOnInit(): void {
    this.loggedInService.selectedClinic$.subscribe((clinicId) => {
      this.clinicId = clinicId;
    })
  }
  create() {
    if (this.insuranceCompanyCreateForm.valid && this.addresses !== undefined) {
      this.insuranceCompany.addresses = this.addresses;
      console.log(JSON.stringify(this.insuranceCompany))
      this.spinner.show();
      this.loggedInService.load().pipe(
        tap((loggedInUser: LoggedInUser) => {
          this.insuranceCompany.organizationId = loggedInUser.organizationId;
        })
        , switchMap((result: any) => {
          return this.insuranceCompanyService.create(this.insuranceCompany)
        })
      )
        .subscribe(() => {
          this.spinner.hide();
          this.insuranceCompanyCreateForm.reset();
          this.toastr.success('Insurance Company Created.');
          this.addpressComp.addresses = [];
          this.router.navigateByUrl('emr/administration/list/insurance/company')
        })
    } else {
      this.toastr.error('Please Check Your Inputs', 'Error In Creation');
    }
  }
  resetError() {

  }
  getInsuranceCompanyAddresses(addresses: any) {
    this.addresses = addresses;
  }
}
