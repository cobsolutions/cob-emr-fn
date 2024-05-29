import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasicComponent } from 'projects/emr-application/src/app/util/basic.component';
import { AddressComponent } from '../../../common/components/address/address.component';
import { Organization } from '../../models/organiztion';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationClinicsCreationComponent } from '../organization.clinic.creation/organization-clinics-creation.component';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent extends BasicComponent implements OnInit, AfterViewInit {
  @ViewChild(AddressComponent) organizationBillingAddress: AddressComponent;
  @ViewChild(OrganizationClinicsCreationComponent) organizationClinicsCreationComponent: OrganizationClinicsCreationComponent;
  @ViewChild('organizationForm') organizationForm: NgForm;
  isvalidAddress: boolean = false;
  isvalidClinics = false;
  basicInvalidFields: string[] = [];
  valid: boolean = true;
  isCreated: boolean = true;
  organization: Organization = {
    name: '',
    dba: '',
    groupNPI: '',
    taxID: '',
    billingAddress: {
      addressType: null,
      country: null
    }
  }
  submitted: boolean = false;
  constructor(private organizationService: OrganizationService
    , private router: Router
    , private toastr: ToastrService
    , private route: ActivatedRoute) {
    super()
  }
  ngAfterViewInit(): void {
    this.setForm(this.organizationForm)
  }

  ngOnInit(): void {
    var organizationId = this.route.snapshot.paramMap.get('id');
    console.log(organizationId)
    if (organizationId !== null) {
      this.isCreated = false
      this.organizationService.getById(Number(organizationId))
        .subscribe(organization => {
          this.organization = organization
          this.organizationClinicsCreationComponent.clinics = organization.clinics;
        })
    }

  }
  create() {
    this.valid = this.validate();
    if (this.valid) {
      this.organization.clinics = this.organizationClinicsCreationComponent.clinicDataHolders
      this.organizationService.create(this.organization)
        .subscribe(() => {
          this.reset();
          this.toastr.success('Organization Created.');
          this.router.navigateByUrl('emr/organization/list')
        }, (error) => {
          console.log(error);
          console.log(error)
          this.toastr.error(error.error.message, 'Error In Creation');
        })
    } else {
      this.submitted = true;
      this.scrollUp();
    }
    this.scrollUp();
  }
  update() {
    console.log('update ')
    this.valid = this.validate();
    if (this.valid) {
      this.organization.clinics = this.organizationClinicsCreationComponent.clinicDataHolders
      this.organizationService.update(this.organization)
        .subscribe(() => {
          this.reset();
          this.toastr.success('Organization updated.');
          this.router.navigateByUrl('emr/organization/list')
        }, (error) => {
          console.log(error);
          console.log(error)
          this.toastr.error(error.error.message, 'Error In Creation');
        })
    } else {
      this.submitted = true;
      this.scrollUp();
    }
    this.scrollUp();
  }
  reset() {
    this.organizationForm.reset();
    this.submitted = false;
  }
  validate(): boolean {
    var valid: boolean = true;
    this.isvalidClinics = this.organizationClinicsCreationComponent.clinicDataHolders.length > 0
    valid = valid && this.isValid() && this.isvalidClinics;
    this.basicInvalidFields = [];
    if (!valid)
      this.getInvalidControls().forEach(invalidControl => {
        this.basicInvalidFields.push(invalidControl);
      })
    return valid;
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}
