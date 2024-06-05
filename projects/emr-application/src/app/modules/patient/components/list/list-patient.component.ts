import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, retry, tap } from 'rxjs';
import { ListTemplate } from '../../../common/template/list.template';
import { Patient } from '../../models/patient';
import { PatientFinderPaginationService } from '../../services/patient/patient-finder-pagination.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent extends ListTemplate implements OnInit {
  editPatientVisibility: boolean = false;
  selectedPatient: Patient;
  constructor(
    private router: Router,
    private patientFinderPaginationService: PatientFinderPaginationService,
    private toastr: ToastrService) {
    super();
  }
  columns: (string | IColumn)[];
  patient$!: Observable<Patient[]>;

  ngOnInit(): void {
    this.columns = this.constructColumns(['id', 'firstName', 'middleName', 'lastName', 'patientId', 'actions']);
    this.initListComponent();
    this.patient$ = this.patientFinderPaginationService.getPateints(this.apiParams$).pipe(
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
    this.router.navigateByUrl('emr/patient/create');
  }
  remove(patientId: number) {

  }
  chart(patientId: number) {
    this.router.navigateByUrl('emr/patient/chart/patientId/' + patientId);
  }
  toggleEditPatient() {
    this.editPatientVisibility = !this.editPatientVisibility
  }
  edit(patient: Patient) {
    this.selectedPatient = patient
    this.editPatientVisibility = true
  }
  changeFacilityVisibility(event: any) {
    if (event === 'close')
      this.toggleEditPatient();
  }
}
