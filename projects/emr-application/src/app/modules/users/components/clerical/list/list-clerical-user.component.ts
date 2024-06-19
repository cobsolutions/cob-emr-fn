import { Component, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { map, Observable, retry, tap } from 'rxjs';
import { User } from '../../../../administration/model/user/user';
import { ListTemplate } from '../../../../common/template/list.template';
import { ClericlaUserService } from '../../../services/clerical/clericla-user.service';
import { ClinicalUserService } from '../../../services/clinical/clinical-user.service';

@Component({
  selector: 'app-list-clerical-user',
  templateUrl: './list-clerical-user.component.html',
  styleUrls: ['./list-clerical-user.component.css']
})
export class ListClericalUserComponent extends ListTemplate implements OnInit {
  users$!: Observable<User[]>;
  columns: (string | IColumn)[];
  public visible = false;
  selectedUser: string
  selecteUserUUID: string
  editUserVisibility: boolean = false;
  constructor(private clericalUserService: ClericlaUserService) { super() }

  ngOnInit(): void {
    this.columns = this.constructColumns(['accountName', 'email', 'actions']);
    this.initListComponent();
    this.users$ = this.clericalUserService.findClercialUsers(this.apiParams$).pipe(
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
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  close() {
    this.visible = !this.visible;
  }
  toggleEditUser() {
    this.editUserVisibility = !this.editUserVisibility
  }
  delete() {

  }
}
