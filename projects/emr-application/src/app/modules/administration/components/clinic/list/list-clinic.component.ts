import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { from, map, Observable, retry, tap } from 'rxjs';
import { Address } from '../../../../common/models';
import { CacheService } from '../../../../common/service/cahce/cache.service';
import { ListTemplate } from '../../../../common/template/list.template';
import { Clinic } from '../../../../patient/models/clinic';
import { ClinicService } from '../../../services/clinic/clinic.service';

@Component({
  selector: 'app-list-clinic',
  templateUrl: './list-clinic.component.html',
  styleUrls: ['./list-clinic.component.css']
})
export class ListClinicComponent extends ListTemplate implements OnInit {
  clinics$!: Observable<Clinic[]>;
  columns: (string | IColumn)[];
  editClinicVisibility: boolean = false;
  selectedClinic: Clinic;
  constructor(private router: Router
    , private clinicService: ClinicService
    , private toastr: ToastrService
    , private sanitizer: DomSanitizer) { super(); }

  ngOnInit(): void {
    this.columns = this.constructColumns(['name', 'actions']);
    this.initListComponent();

    this.clinics$ = this.clinicService.get(this.apiParams$).pipe(
      tap((result => {
        console.log(JSON.stringify(result))
      })),
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
    this.router.navigateByUrl('emr/administration/create/clinic');
  }
  edit(item: any) {
    this.selectedClinic = item;
    this.editClinicVisibility = true;
  }
  remove(item: any) {
    this.clinicService.delete(item.id).subscribe(() => {
      this.toastr.success('Clinic Deleted');
      this.ngOnInit();
    }, (error: any) => {
      this.toastr.error(error.error.message);
    })
  }
  constructAddress(address: Address): string {
    var result: string = '';
    for (const [key, value] of Object.entries(address)) {
      if (key === 'firstAddress')
        result = value + ',';
      if (key === 'state')
        result = value + ',';
      if (key === 'zipCode')
        result = value;
    }
    return result;
  }
  toggleEditClinic() {
    this.editClinicVisibility = !this.editClinicVisibility
  }
}
