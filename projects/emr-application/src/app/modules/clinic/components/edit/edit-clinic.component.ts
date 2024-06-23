import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClinicService } from '../../../administration/services/clinic/clinic.service';
import { Clinic } from '../../../patient/models/clinic';

@Component({
  selector: 'app-edit-clinic',
  templateUrl: './edit-clinic.component.html',
  styleUrls: ['./edit-clinic.component.css']
})
export class EditClinicComponent implements OnInit {
  @Input() clinic: Clinic
  @ViewChild('clinicEditForm') clinicEditForm: NgForm;
  @Output() changeVisibility = new EventEmitter<string>()
  validateForm: boolean = false;
  validAddress: boolean = true;
  constructor(private clinicService: ClinicService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
  }
    update() {
    this.validAddress = this.isAddressValid();
    if (this.clinicEditForm.valid && this.validAddress) {
      this.validateForm = false;
      this.clinicService.update(this.clinic).subscribe(result => {
        this.changeVisibility.emit('close');
        this.toastr.success('Clinic Update');
      }, error => {
        this.toastr.error('Error during updating clinic');
      })
    } else {
      this.validateForm = true;
    }
  }
  resetError() { }
  isAddressValid() {
    return (this.clinic.address.firstAddress !== null || this.clinic.address.firstAddress != '')
      && (this.clinic.address.addressType !== null || this.clinic.address.addressType !== '')
      && (this.clinic.address.city !== null || this.clinic.address.city !== '')
      && (this.clinic.address.country !== null || this.clinic.address.country !== '')
      && (this.clinic.address.state !== null || this.clinic.address.state !== '')
      && (this.clinic.address.zipCode !== null || this.clinic.address.zipCode !== '');
  }
}
