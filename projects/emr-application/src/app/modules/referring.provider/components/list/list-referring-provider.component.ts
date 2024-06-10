import { Component, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { map, Observable, retry, tap } from 'rxjs';
import { ListTemplate } from '../../../common/template/list.template';
import { ReferringProvider } from '../../model/referring.provider';
import { ReferringProviderService } from '../../service/referring-provider.service';

@Component({
  selector: 'app-list-referring-provider',
  templateUrl: './list-referring-provider.component.html',
  styleUrls: ['./list-referring-provider.component.css']
})
export class ListReferringProviderComponent extends ListTemplate implements OnInit {
  referringProvider$: Observable<ReferringProvider[]>;
  addReferringProviderVisibility: boolean = false;
  columns: (string | IColumn)[];
  constructor(private referringProviderService: ReferringProviderService) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    this.columns = this.constructColumns(['name', 'npi', 'actions']);
    this.find();
  }
  toggleReferringProvider() {
    this.addReferringProviderVisibility = !this.addReferringProviderVisibility
  }
  create() {
    this.addReferringProviderVisibility = true;
  }
  remove(item: any) {

  }
  edit(item: any) {

  }
  find() {
    this.referringProvider$ = this.referringProviderService.get(this.apiParams$).pipe(
      tap((result => {
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
        for (var i = 0; i < response.records.length; i++) {
          var ss = response.records[i];
          ss.name = ss.lastName + ',' + ss.firstName;
        }
        return response.records;
      })
    );
  }
  changeVisibility(event: any) {
    if (event === 'close') {
      this.addReferringProviderVisibility = false
      this.find();
    }

  }
}
