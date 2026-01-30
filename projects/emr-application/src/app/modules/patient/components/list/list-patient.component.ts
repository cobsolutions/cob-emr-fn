import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, filter, map, Observable, of, retry, switchMap, tap } from 'rxjs';
import { ListTemplate } from '../../../common/template/list.template';
import { Role } from '../../../security/model/role';
import { Patient } from '../../models/patient';
import { PatientFinderPaginationService } from '../../services/patient/patient-finder-pagination.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent extends ListTemplate implements OnInit {
  editPatientVisibility: boolean = false;
  selectedPatient: Patient;
  columns: (string | IColumn)[];
  patient$!: Observable<Patient[]>;
  componentRole: string[] = [Role.PATIENT_ROLE];

  // Search panel state
  searchPanelOpen = true;
  hasSearched = false;
  searchFirstName = '';
  searchLastName = '';
  searchPhone = '';
  searchType = 'ALL_CLINIC_PATIENT';
  searchDateOfBirth: Date | null = null;

  // Search body stream — null means no search triggered yet
  searchBody$ = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patientFinderPaginationService: PatientFinderPaginationService,
    private loggedInService: LoggedInService,
    private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.columns = this.constructColumns(['patientName', 'gender', 'email', 'phone', 'dateOfBirth', 'actions']);
    this.initListComponent();

    // Patient data only flows when searchBody$ emits a non-null value
    this.patient$ = this.patientFinderPaginationService.searchPatients(this.apiParams$, this.searchBody$).pipe(
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

    // Listen for header search via query params (works on navigation & same-route)
    this.route.queryParams.pipe(
      filter(params => !!params['name']),
      switchMap(params => {
        const clinicId = this.loggedInService.selectedClinic$.value;
        return this.patientFinderPaginationService.searchByName(params['name'], clinicId!);
      })
    ).subscribe({
      next: (response: any) => {
        const records = response.records ?? response;
        this.hasSearched = true;
        this.searchPanelOpen = false;
        this.patient$ = of(Array.isArray(records) ? records : []);
        this.totalItems$.next(Array.isArray(records) ? records.length : 0);
      },
      error: (err) => {
        console.error('Header search failed:', err);
        this.errorMessage$.next(err.message ?? 'Search failed');
      }
    });

  }

  create() {
    this.router.navigateByUrl('emr/patient/create');
  }

  chart(patientId: number) {
    this.router.navigateByUrl('emr/patient/chart/patientId/' + patientId);
  }

  toggleEditPatient() {
    this.editPatientVisibility = !this.editPatientVisibility;
  }

  edit(patient: Patient) {
    this.selectedPatient = patient;
    this.editPatientVisibility = true;
  }

  changeFacilityVisibility(event: any) {
    if (event === 'close')
      this.toggleEditPatient();
  }

  toggleSearchPanel() {
    this.searchPanelOpen = !this.searchPanelOpen;
  }

  get isSearchEmpty(): boolean {
    return !this.searchFirstName.trim()
      && !this.searchLastName.trim()
      && !this.searchPhone.replace(/\D/g, '')
      && this.searchDateOfBirth === null;
  }

  search() {
    if (this.isSearchEmpty) return;

    const phoneDigits = this.searchPhone.replace(/\D/g, '');
    const body = {
      searchType: this.searchType,
      firstName: this.searchFirstName.trim() || null,
      lastName: this.searchLastName.trim() || null,
      phoneNumber: phoneDigits || null,
      dateOfBirth: this.searchDateOfBirth ? this.searchDateOfBirth.getTime() : null
    };

    this.hasSearched = true;
    this.setActivePage(1);
    this.searchBody$.next(body);
  }

  clearSearch() {
    this.searchFirstName = '';
    this.searchLastName = '';
    this.searchPhone = '';
    this.searchType = 'ALL_CLINIC_PATIENT';
    this.searchDateOfBirth = null;
    this.hasSearched = false;
    this.searchBody$.next(null);
    this.totalItems$.next(0);
  }

  onPhoneInput() {
    let digits = this.searchPhone.replace(/\D/g, '');
    if (digits.length > 10) digits = digits.substring(0, 10);
    if (digits.length >= 7) {
      this.searchPhone = `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
    } else if (digits.length >= 4) {
      this.searchPhone = `(${digits.substring(0, 3)}) ${digits.substring(3)}`;
    } else if (digits.length > 0) {
      this.searchPhone = `(${digits}`;
    } else {
      this.searchPhone = '';
    }
  }
}
