import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { ListTemplate } from 'projects/emr-application/src/app/modules/common/template/list.template';
import { map, Observable, retry, tap } from 'rxjs';
import { User } from '../../../../model/user/user';
import { ClinicalUserService } from '../../../../services/user/clinical.user/clinical-user.service';

@Component({
  selector: 'app-list-clinical-user',
  templateUrl: './list-clinical-user.component.html',
  styleUrls: ['./list-clinical-user.component.css']
})
export class ListClinicalUserComponent extends ListTemplate implements OnInit {
  users$!: Observable<User[]>;
  columns: (string | IColumn)[];
  public visible = false;
  selectedUser: string
  constructor(private router: Router
    , private toastr: ToastrService
    , private clinicalUserService: ClinicalUserService) { super() }

  ngOnInit(): void {
    this.columns = this.constructColumns(['accountName', 'email', 'actions']);
    this.initListComponent();
    this.users$ = this.clinicalUserService.getClinicalUser(this.apiParams$).pipe(
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
  toggleLiveDemo(item: any) {
    this.selectedUser = item.uuid;
    this.visible = !this.visible;
  }
  close() {
    this.visible = !this.visible;
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  delete() {
    this.clinicalUserService.deleteUser(this.selectedUser).subscribe((result) => {
      document.location.reload();
    })
  }
  edit(item: any) {
    this.router.navigate(['emr/administration/edit/user', item.uuid]);
  }
}
