import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { map, Observable, retry, tap } from 'rxjs';
import { User } from '../../../../administration/model/user/user';
import { ListTemplate } from '../../../../common/template/list.template';
import { Role } from '../../../../security/model/role';
import { ClinicalUserService } from '../../../services/clinical/clinical-user.service';

@Component({
  selector: 'app-list-clinical-user',
  templateUrl: './list-clinical-user.component.html',
  styleUrls: ['./list-clinical-user.component.css']
})
export class ListClinicalUserComponent extends ListTemplate implements OnInit {
  users$!: Observable<User[]>;
  columns: (string | IColumn)[];
  public visible = false;
  selectedDoctor: string;
  selecteUserUUID: string
  editUserVisibility: boolean = false;
  addUserVisibility: boolean = false;
  componentRole: string[] = [Role.USER_ROLE ];
  constructor(private router: Router
    , private clinicalService: ClinicalUserService) { super() }

  ngOnInit(): void {
    this.columns = this.constructColumns(['accountName', 'npi', 'licence', 'speciality', 'credential', 'email', 'actions']);
    this.initListComponent();
    this.fill();
  }
  private fill(){
    this.users$ = this.clinicalService.getDoctorUser(this.apiParams$).pipe(
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
    this.clinicalService.deleteDoctor(this.selectedDoctor).subscribe((result) => {
      document.location.reload();
    })
  }
  edit(item: any) {
    this.selecteUserUUID = item.uuid
    this.editUserVisibility = true
  }
  toggleEditUser() {
    this.editUserVisibility = !this.editUserVisibility
  }
  changeFacilityVisibility(event: string) {
    if (event === 'close'){
      this.editUserVisibility = false; 
      this.fill()     
    }
  }
}
