import { Component, OnInit, ViewChild } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { map, Observable, retry, tap } from 'rxjs';
import { ListTemplate } from '../../../common/template/list.template';
import { Role } from '../../../security/model/role';
import { ReferringProvider } from '../../model/referring.provider';
import { ReferringProviderService } from '../../service/referring-provider.service';
import { CreateReferringProviderComponent } from '../create/create-referring-provider.component';

@Component({
  selector: 'app-list-referring-provider',
  templateUrl: './list-referring-provider.component.html',
  styleUrls: ['./list-referring-provider.component.css']
})
export class ListReferringProviderComponent extends ListTemplate implements OnInit {
  referringProvider$: Observable<ReferringProvider[]>;
  selectedreferringProvider: ReferringProvider;
  addReferringProviderVisibility: boolean = false;
  editReferringProviderVisibility: boolean = false;
  columns: (string | IColumn)[];
  componentRole: string[] = [Role.REFERRING_DOCTOR_ROLE ];
  constructor(private referringProviderService: ReferringProviderService) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    this.columns = this.constructColumns(['provider', 'npi', 'status']);
    this.find();
  }
  toggleReferringProvider() {
    this.addReferringProviderVisibility = !this.addReferringProviderVisibility
  }
  toggleEditReferringProvvider() {
    this.editReferringProviderVisibility = !this.editReferringProviderVisibility;
  }
  create() {
    this.addReferringProviderVisibility = true;
  }
  remove(item: any) {

  }
  edit(item: any) {
    this.selectedreferringProvider = item;
    this.editReferringProviderVisibility = true;
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
        return response.records.map((record: any) => ({
          ...record,
          name: `${record.lastName}, ${record.firstName}`,
          initials: `${(record.firstName?.[0] || '').toUpperCase()}${(record.lastName?.[0] || '').toUpperCase()}`,
          status: record.status || 'Active'
        }));
      })
    );
  }
  changeVisibility(event: any) {
    console.log(event)
    if (event === 'create-close')
      this.addReferringProviderVisibility = false
    if (event === 'update-close')
      this.editReferringProviderVisibility = false
    this.find();
  }
}
