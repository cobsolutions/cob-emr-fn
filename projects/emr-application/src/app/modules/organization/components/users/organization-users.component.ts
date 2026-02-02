import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../administration/services/user/user.service';
import { Organization } from '../../models/organiztion';
import { OrganizationUser } from '../../models/organization-user';
import { SignatureAuditRecord } from '../../models/signature-audit';
import { OrganizationService } from '../../services/organization.service';
import { SignatureAuditService } from '../../services/signature-audit.service';

@Component({
  selector: 'app-organization-users',
  templateUrl: './organization-users.component.html',
  styleUrls: ['./organization-users.component.css']
})
export class OrganizationUsersComponent implements OnInit {
  organizationId: number;
  organization: Organization;
  users: OrganizationUser[] = [];
  filteredUsers: OrganizationUser[] = [];
  isLoading: boolean = true;
  timelineVisible: boolean = false;
  timelineLoading: boolean = false;
  selectedUser: OrganizationUser;
  auditRecords: SignatureAuditRecord[] = [];

  searchTerm: string = '';
  statusFilter: string = 'all';
  activeCount: number = 0;
  inactiveCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
    private userService: UserService,
    private signatureAuditService: SignatureAuditService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.organizationId = +this.route.snapshot.paramMap.get('id');
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    this.spinner.show();
    this.organizationService.getById(this.organizationId).subscribe({
      next: (org) => {
        this.organization = org;
      },
      error: (err) => console.log(err)
    });
    this.userService.findAllByOrganization(this.organizationId).subscribe({
      next: (users: OrganizationUser[]) => {
        this.users = users || [];
        this.applyFilters();
        this.isLoading = false;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.spinner.hide();
      }
    });
  }

  applyFilters(): void {
    this.activeCount = this.users.filter(u => this.isActive(u)).length;
    this.inactiveCount = this.users.length - this.activeCount;

    let result = this.users;

    if (this.statusFilter === 'ACTIVE') {
      result = result.filter(u => this.isActive(u));
    } else if (this.statusFilter === 'INACTIVE') {
      result = result.filter(u => !this.isActive(u));
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      result = result.filter(u => {
        const displayName = this.getUserDisplayName(u).toLowerCase();
        const userName = (u.userName || '').toLowerCase();
        const email = (u.email || '').toLowerCase();
        const uuid = (u.uuid || '').toLowerCase();
        return displayName.includes(term)
            || userName.includes(term)
            || email.includes(term)
            || uuid.includes(term);
      });
    }

    this.filteredUsers = result;
  }

  setStatusFilter(filter: string): void {
    this.statusFilter = filter;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilters();
  }

  get hasActiveFilters(): boolean {
    return this.searchTerm.trim() !== '' || this.statusFilter !== 'all';
  }

  clearAllFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.applyFilters();
  }

  goBack(): void {
    this.router.navigate(['/emr/organization/list']);
  }

  confirmVisible: boolean = false;
  confirmUser: OrganizationUser;
  confirmNewStatus: string = '';
  statusUpdating: boolean = false;

  isActive(user: OrganizationUser): boolean {
    if (user.status != null) {
      return user.status === 'ACTIVE';
    }
    return !!user.active;
  }

  requestToggle(user: OrganizationUser, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.confirmUser = user;
    this.confirmNewStatus = this.isActive(user) ? 'INACTIVE' : 'ACTIVE';
    this.confirmVisible = true;
  }

  cancelToggle(): void {
    this.confirmVisible = false;
    this.confirmUser = null;
    this.confirmNewStatus = '';
  }

  confirmToggle(): void {
    if (!this.confirmUser || this.statusUpdating) return;
    this.statusUpdating = true;
    this.userService.updateStatus(this.confirmUser.uuid, this.confirmNewStatus).subscribe({
      next: () => {
        if (this.confirmUser.status != null) {
          this.confirmUser.status = this.confirmNewStatus;
        } else {
          this.confirmUser.active = this.confirmNewStatus === 'ACTIVE';
        }
        this.statusUpdating = false;
        this.confirmVisible = false;
        this.confirmUser = null;
        this.applyFilters();
      },
      error: (err) => {
        console.log(err);
        this.statusUpdating = false;
      }
    });
  }

  openTimeline(user: OrganizationUser): void {
    this.selectedUser = user;
    this.auditRecords = [];
    this.timelineLoading = true;
    this.timelineVisible = true;
    this.signatureAuditService.findByUser(user.uuid).subscribe({
      next: (records) => {
        this.auditRecords = records;
        this.timelineLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.timelineLoading = false;
      }
    });
  }

  closeTimeline(): void {
    this.timelineVisible = false;
    this.auditRecords = [];
  }

  getUserDisplayName(user: OrganizationUser): string {
    const full = [user.firstName, user.lastName].filter(Boolean).join(' ');
    return full || user.userName || user.accountName || '';
  }

  getUserInitials(user: OrganizationUser): string {
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    if (first || last) return (first + last).toUpperCase();
    return (user.userName?.charAt(0) || '?').toUpperCase();
  }

  copiedUuid: string = '';

  copyUuid(uuid: string, event: Event): void {
    event.stopPropagation();
    navigator.clipboard.writeText(uuid);
    this.copiedUuid = uuid;
    setTimeout(() => this.copiedUuid = '', 1500);
  }
}
