import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, Observable, switchMap, tap } from 'rxjs';
import { ListTemplate } from '../../../common/template/list.template';
import { User } from '../../../administration/model/user/user';
import { UserService } from '../../../administration/services/user/user.service';
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

interface EntityGroup {
  entityId: number;
  entityName: string;
  records: AuditRecord[];
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
  groupedRecords$!: Observable<EntityGroup[]>;
  clinicId: number;
  expandedChanges: Set<number> = new Set();
  expandedGroups: Set<number> = new Set();
  groupCurrentPage: Map<number, number> = new Map();
  groupItemsPerPage: number = 5;
  readonly CHANGES_PREVIEW_COUNT = 2;
  readonly itemsPerPageOptions = [5, 10, 20];
  searched: boolean = false;
  noResults: boolean = false;
  isSearching: boolean = false;

  // User autocomplete
  userSearchControl = new FormControl();
  filteredUsers: User[] = [];
  isUserLoading = false;
  selectedUser: any;

  // Patient autocomplete
  patientSearchControl = new FormControl();
  filteredPatients: any[] = [];
  isPatientLoading = false;
  selectedPatient: any;

  constructor(
    private schedulerAuditService: SchedulerAuditService,
    private loggedInService: LoggedInService,
    private userService: UserService,
    private patientFinderService: PatientFinderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.catchSelectedClinic();
    this.initUserAutocomplete();
    this.initPatientAutocomplete();
  }

  get isSearchValid(): boolean {
    return !!this.searchCriteria.patientId
      && !!this.searchCriteria.searchStartDate
      && !!this.searchCriteria.searchEndDate;
  }

  search() {
    if (this.isSearching) return;
    this.searched = true;
    this.noResults = false;
    this.isSearching = true;
    this.groupCurrentPage = new Map();
    this.apiParams = {
      performedByUuid: this.searchCriteria.performedByUuid || undefined,
      patientId: this.searchCriteria.patientId || undefined,
      startDate: this.searchCriteria.searchStartDate || undefined,
      endDate: this.searchCriteria.searchEndDate || undefined,
      limit: 9999,
      offset: 0
    };
    this.find();
  }

  // User autocomplete handlers
  onUserSelect(user: User) {
    this.selectedUser = user;
    this.searchCriteria.performedByUuid = user.uuid;
    this.userSearchControl.setValue(user.accountName, { emitEvent: false });
    this.filteredUsers = [];
  }

  clearUser() {
    this.selectedUser = undefined;
    this.searchCriteria.performedByUuid = undefined;
    this.userSearchControl.setValue('', { emitEvent: false });
    this.filteredUsers = [];
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
    if (filter === 'user') this.clearUser();
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

  isGroupExpanded(entityId: number): boolean {
    return this.expandedGroups.has(entityId);
  }

  toggleGroup(entityId: number) {
    if (this.expandedGroups.has(entityId)) {
      this.expandedGroups.delete(entityId);
    } else {
      this.expandedGroups.add(entityId);
    }
  }

  expandAllGroups(groups: EntityGroup[]) {
    this.expandedGroups = new Set(groups.map(g => g.entityId));
  }

  collapseAllGroups() {
    this.expandedGroups = new Set();
  }

  getGroupCurrentPage(entityId: number): number {
    return this.groupCurrentPage.get(entityId) || 1;
  }

  getGroupTotalPages(group: EntityGroup): number {
    return Math.ceil(group.records.length / this.groupItemsPerPage);
  }

  getGroupVisibleRecords(group: EntityGroup): AuditRecord[] {
    const page = this.getGroupCurrentPage(group.entityId);
    const start = (page - 1) * this.groupItemsPerPage;
    return group.records.slice(start, start + this.groupItemsPerPage);
  }

  handleGroupPageChange(entityId: number, page: number) {
    this.groupCurrentPage.set(entityId, page);
  }

  onGroupItemsPerPageChange(value: number) {
    this.groupItemsPerPage = value;
    this.groupCurrentPage = new Map();
  }

  private groupByEntityId(records: AuditRecord[]): EntityGroup[] {
    const groupMap = new Map<number, EntityGroup>();
    const groupOrder: number[] = [];

    for (const record of records) {
      if (!groupMap.has(record.entityId)) {
        groupOrder.push(record.entityId);
        groupMap.set(record.entityId, {
          entityId: record.entityId,
          entityName: record.entityName,
          records: []
        });
      }
      groupMap.get(record.entityId)!.records.push(record);
    }

    return groupOrder.map(id => groupMap.get(id)!);
  }

  private initUserAutocomplete() {
    const organizationId = this.loggedInService.getLoggedUser().organizationId;
    this.userSearchControl.valueChanges
      .pipe(
        tap(text => {
          if (text && text.length > 1) {
            this.isUserLoading = true;
            this.filteredUsers = [];
          }
        }),
        filter(text => {
          if (!text || text.trim().length === 0) {
            this.filteredUsers = [];
            this.isUserLoading = false;
            this.clearUser();
            return false;
          }
          if (text.length <= 1) {
            this.filteredUsers = [];
            this.isUserLoading = false;
            return false;
          }
          return true;
        }),
        debounceTime(300),
        switchMap(value => this.userService.findAllByOrganization(organizationId).pipe(
          map((users: any[]) => {
            const search = value.toLowerCase();
            return (users || [])
              .filter(u => u.clinicIds?.includes(this.clinicId) && u.userName?.toLowerCase().includes(search))
              .map(u => ({ ...u, accountName: u.userName } as User));
          })
        ))
      )
      .subscribe(
        users => {
          this.filteredUsers = users;
          this.isUserLoading = false;
        },
        () => {
          this.isUserLoading = false;
          this.filteredUsers = [];
        }
      );
  }

  private initPatientAutocomplete() {
    this.patientSearchControl.valueChanges
      .pipe(
        tap(text => {
          if (text && text.length > 3) {
            this.isPatientLoading = true;
            this.filteredPatients = [];
          }
        }),
        filter(text => {
          if (!text || text.length <= 3) {
            this.filteredPatients = [];
            this.isPatientLoading = false;
            return false;
          }
          return true;
        }),
        debounceTime(1000),
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

  private catchSelectedClinic() {
    this.loggedInService.selectedClinic$.subscribe(clinicId => {
      if (clinicId) {
        this.clinicId = clinicId;
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
        this.isSearching = false;
        this.errorMessage$.next('');
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records?.content || [];
      })
    );
    this.groupedRecords$ = this.auditRecords$.pipe(
      map(records => {
        const groups = this.groupByEntityId(records);
        this.expandedGroups = new Set(groups.map(g => g.entityId));
        this.groupCurrentPage = new Map();
        return groups;
      })
    );
  }
}
