import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ListTemplate } from 'projects/emr-application/src/app/modules/common/template/list.template';
import { map, Observable, retry, tap } from 'rxjs';
import { DoctorUser } from '../../../../model/user/doctor';
import { DotorUserService } from '../../../../services/user/doctor.user/dotor-user.service';

@Component({
  selector: 'app-list-doctor-user',
  templateUrl: './list-doctor-user.component.html',
  styleUrls: ['./list-doctor-user.component.css']
})
export class ListDoctorUserComponent extends ListTemplate implements OnInit {
  users$!: Observable<DoctorUser[]>;
  columns: (string | IColumn)[];
  public visible = false;
  selectedDoctor:string;
  constructor(private router: Router
    , private dotorUserService: DotorUserService) { super() }

  ngOnInit(): void {
    this.columns = this.constructColumns(['accountName', 'email', 'actions']);
    this.initListComponent();
    this.users$ = this.dotorUserService.getDoctorUser(this.apiParams$).pipe(
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
  details_visible = Object.create({});
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  toggleLiveDemo(item: any) {
    this.selectedDoctor = item.uuid;
    this.visible = !this.visible;
  }
  close() {
    this.visible = !this.visible;
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  delete() {
    this.dotorUserService.deleteDoctor(this.selectedDoctor).subscribe((result) => {
      document.location.reload();
    })
  }
  edit(item: any) {
    this.router.navigate(['emr/administration/edit/user', item.uuid]);
  }
}
