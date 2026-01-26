import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';
import { ClinicService } from '../../../administration/services/clinic/clinic.service';
import { Clinic } from '../../../patient/models/clinic';
import { LoggedInUser } from '../../../security/model/loggedin.user';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';

@Component({
  selector: 'app-create-clinic',
  templateUrl: './create-clinic.component.html',
  styleUrls: ['./create-clinic.component.css']
})
export class CreateClinicComponent implements OnInit {
  @ViewChild('clinicCreateForm') clinicCreateForm: NgForm;
  submitted: boolean = false;
  validAddress: boolean = true;
  isCreated: boolean = true;
  clinic: Clinic = {
    name: null,
    address: {
      addressType: null,
      country: null,
    }
  };
  constructor(private clinicService: ClinicService
    , private toastr: ToastrService
    , private router: Router
    , private loggedInService: LoggedInService) { }

  get isValidClinicName(): boolean {
    return this.clinic.name !== null && this.clinic.name?.trim() !== '';
  }

  get isValidClinicAddress(): boolean {
    return this.isAddressValid();
  }

  get valid(): boolean {
    return this.isValidClinicName && this.isValidClinicAddress;
  }

  ngOnInit(): void {
  }
  create() {
    this.validAddress = this.isAddressValid();
    if (this.clinicCreateForm.valid && this.validAddress) {
      this.submitted = false;
      this.clinic.organizationId = this.loggedInService.getLoggedUser().organizationId;
      this.clinicService.create(this.clinic)
        .subscribe(dd => {
          if (this.isCreated)
            this.toastr.success('Clinic Created');
          else
            this.toastr.success('Clinic updated');
          this.router.navigateByUrl('emr/clinics/list')
        })
    } else {
      this.submitted = true;
    }
  }
  resetError() {
    this.submitted = false;
  }
  isAddressValid() {
    return this.clinic.address.firstAddress !== null
      && this.clinic.address.addressType !== null
      && this.clinic.address.city !== null
      && this.clinic.address.country !== null
      && this.clinic.address.state !== null
      && this.clinic.address.zipCode !== null;
  }
}
