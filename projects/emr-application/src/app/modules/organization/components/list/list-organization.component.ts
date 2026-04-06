import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IColumn, IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { NgxSpinnerService } from 'ngx-spinner';
import { Address } from '../../../common/models';
import { Clinic } from '../../../patient/models/clinic';
import { Organization } from '../../models/organiztion';
import { OrganizationService } from '../../services/organization.service';
import orgData from './data'
@Component({
  selector: 'app-list-organization',
  templateUrl: './list-organization.component.html',
  styleUrls: ['./list-organization.component.css']
})
export class ListOrganizationComponent implements OnInit {
  editOrganizationVisibility: boolean = false
  selectedOrganization: Organization;
  data: IItem[] = orgData;
  public clinicsVisible: boolean = false;
  isLoading: boolean = true;

  organiztions: IItem[]
  clinics: Clinic[];
  readonly columns: (string | IColumn)[] = [
    {
      key: 'name',
      label: 'Name',
      // _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'dba',
      label: 'Group DBA',
      //_style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'groupNPI',
      label: 'Group NPI',
      //_style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'action',
      label: 'Action',
      _style: { width: '20%' },
      filter: false,
      sorter: false,
    },
  ]
  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadOrganizations();
  }

  private loadOrganizations(): void {
    this.isLoading = true;
    this.spinner.show();
    this.organizationService.getAll()
      .subscribe({
        next: (organizations) => {
          this.organiztions = organizations;
          this.isLoading = false;
          this.spinner.hide();
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
          this.spinner.hide();
        }
      });
  }
  create() {
    this.router.navigate(['/emr/organization/create']);
  }
  closeClinicModal() {
    this.clinicsVisible = !this.clinicsVisible;
  }
  edit(item: any) {
    this.selectedOrganization = item
    this.editOrganizationVisibility = true
  }
  toggleEditOrganization() {
    this.editOrganizationVisibility = !this.editOrganizationVisibility
  }
  manageUsers(item: any) {
    this.router.navigate(['/emr/organization/' + item.id + '/users']);
  }
}
