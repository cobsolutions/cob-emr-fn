import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { debounceTime, filter, map, Observable, switchMap, tap } from 'rxjs';
import { ListTemplate } from '../../../common/template/list.template';
import { User } from '../../../administration/model/user/user';
import { DotorUserService } from '../../../administration/services/user/doctor.user/dotor-user.service';
import { PatientFinderService } from '../../../patient/services/patient/patient-finder.service';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { AuditRecord } from '../../models/audit-record';
import { SchedulerAuditService } from '../../service/audit/scheduler-audit.service';

interface SearchCriteria {
  performedByUuid?: string;
  patientId?: number;
  searchStartDate?: string;
  searchEndDate?: string;
}

@Component({
  selector: 'app-scheduler-history',
  templateUrl: './scheduler-history.component.html',
  styleUrls: ['./scheduler-history.component.css']
})
export class SchedulerHistoryComponent extends ListTemplate implements OnInit {

  searchCriteria: SearchCriteria = {};
  searchCollapsed: boolean = false;
  auditRecords$!: Observable<AuditRecord[]>;
  columns: (string | IColumn)[];
  clinicId: number;
  expandedChanges: Set<number> = new Set();
  readonly CHANGES_PREVIEW_COUNT = 2;
  searched: boolean = false;
  noResults: boolean = false;

  // User autocomplete
  users$!: Observable<User[]>;
  selectedUser: any;

  // Patient autocomplete
  patientSearchControl = new FormControl();
  filteredPatients: any[] = [];
  isPatientLoading = false;
  selectedPatient: any;

  constructor(
    private schedulerAuditService: SchedulerAuditService,
    private loggedInService: LoggedInService,
    private doctorUserService: DotorUserService,
    private patientFinderService: PatientFinderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.catchSelectedClinic();
    this.initListComponent();
    this.columns = this.constructColumns(['entityName', 'clinicName', 'calendarName', 'action', 'changes', 'performedByName', 'performedAt']);
    this.initPatientAutocomplete();
  }

  get isSearchValid(): boolean {
    return !!this.searchCriteria.performedByUuid
      && !!this.searchCriteria.patientId
      && !!this.searchCriteria.searchStartDate
      && !!this.searchCriteria.searchEndDate;
  }

  search() {
    this.searched = true;
    this.noResults = false;
    this.setActivePage(1);
    this.find();
    this.apiParams = {
      performedByUuid: this.searchCriteria.performedByUuid || undefined,
      patientId: this.searchCriteria.patientId || undefined,
      startDate: this.searchCriteria.searchStartDate || undefined,
      endDate: this.searchCriteria.searchEndDate || undefined
    };
  }

  // User autocomplete handlers
  onUserSelected(event: any) {
    this.selectedUser = event;
    this.searchCriteria.performedByUuid = event.uuid;
  }

  onUserCleared() {
    this.selectedUser = undefined;
    this.searchCriteria.performedByUuid = undefined;
  }

  // Patient autocomplete handlers
  onPatientSelect(patient: any) {
    this.selectedPatient = patient;
    this.searchCriteria.patientId = patient.id;
    this.patientSearchControl.setValue(patient.lastName + ', ' + patient.firstName, { emitEvent: false });
    this.filteredPatients = [];
  }

  clearPatient() {
    this.selectedPatient = undefined;
    this.searchCriteria.patientId = undefined;
    this.patientSearchControl.setValue('', { emitEvent: false });
    this.filteredPatients = [];
  }

  clearFilter(filter: string) {
    if (filter === 'user') this.onUserCleared();
    if (filter === 'patient') this.clearPatient();
    if (filter === 'date') {
      this.searchCriteria.searchStartDate = undefined;
      this.searchCriteria.searchEndDate = undefined;
    }
  }

  formatChange(change: any): string {
    const oldVal = change.oldValue ?? '—';
    const newVal = change.newValue ?? '—';
    return `${change.field}: ${oldVal} → ${newVal}`;
  }

  isExpanded(recordId: number): boolean {
    return this.expandedChanges.has(recordId);
  }

  toggleChanges(recordId: number) {
    if (this.expandedChanges.has(recordId)) {
      this.expandedChanges.delete(recordId);
    } else {
      this.expandedChanges.add(recordId);
    }
  }

  private initPatientAutocomplete() {
    this.patientSearchControl.valueChanges
      .pipe(
        filter(text => {
          if (!text || text.length <= 3) {
            this.filteredPatients = [];
            return false;
          }
          return true;
        }),
        debounceTime(1000),
        tap(() => {
          this.filteredPatients = [];
          this.isPatientLoading = true;
        }),
        switchMap(value => this.patientFinderService.getPatientsByName(value))
      )
      .subscribe(
        data => {
          this.isPatientLoading = false;
          this.filteredPatients = data?.body || [];
        },
        () => {
          this.isPatientLoading = false;
          this.filteredPatients = [];
        }
      );
  }

  private loadUsersForClinic() {
    if (!this.clinicId) return;
    this.users$ = this.doctorUserService.getAllClinicalsUsersByClinic(this.clinicId);
  }

  private catchSelectedClinic() {
    this.loggedInService.selectedClinic$.subscribe(clinicId => {
      if (clinicId) {
        this.clinicId = clinicId;
        this.loadUsersForClinic();
      }
    });
  }

  private find() {
    if (!this.clinicId) return;
    this.auditRecords$ = this.schedulerAuditService.findAll(this.apiParams$, this.clinicId).pipe(
      tap((response: any) => {
        const total = response.records?.totalElements || 0;
        this.totalItems$.next(total);
        this.noResults = total === 0;
        this.errorMessage$.next('');
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records?.content || [];
      })
    );
  }
}
