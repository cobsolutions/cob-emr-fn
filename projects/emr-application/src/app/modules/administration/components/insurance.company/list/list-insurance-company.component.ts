import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, retry, tap } from 'rxjs';
import { ClinicEmittingService } from '../../../../common/service/emitting/clinic-emitting.service';
import { ListTemplate } from '../../../../common/template/list.template';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { InsuranceCompany } from '../../../model/insurance.company/insurance.company';
import { InsuranceCompanyService } from '../../../services/insurance.company/insurance-company.service';

@Component({
  selector: 'app-list-insurance-company',
  templateUrl: './list-insurance-company.component.html',
  styleUrls: ['./list-insurance-company.component.css']
})
export class ListInsuranceCompanyComponent extends ListTemplate implements OnInit {


  columns: (string | IColumn)[];

  insuranceCompany$!: Observable<InsuranceCompany[]>;
  editInsuranceCompanyVisibility: boolean = false;
  selectedInsuranceCompany: InsuranceCompany;
  constructor(private router: Router
    , private insuranceCompanyService: InsuranceCompanyService
    , private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.columns = this.constructColumns(['name', 'insuranceType', 'phone', 'fax', 'actions']);
    this.initListComponent();
    this.insuranceCompany$ = this.insuranceCompanyService.get(this.apiParams$).pipe(
      retry({
        delay: (error) => {
          console.warn('Retry: ', error);
          this.errorMessage$.next(error.message ?? `Error: ${JSON.stringify(error)}`);
          this.loadingData$.next(false);
          return this.retry$;
        }
      }),
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    );
  }

  create() {
    this.router.navigateByUrl('emr/administration/create/insurance/company');
  }
  remove(item: any) {
    this.insuranceCompanyService.delete(item.id).subscribe(() => {
      console.log(item);
      this.toastr.success('Insurance Company Deleted..!!');
      this.ngOnInit();
    })
  }
  edit(item: any) {
    this.selectedInsuranceCompany = item;
    this.editInsuranceCompanyVisibility = true
  }
  toggleEdiInsuranceCompany() {
    this.editInsuranceCompanyVisibility = !this.editInsuranceCompanyVisibility
  }
}
