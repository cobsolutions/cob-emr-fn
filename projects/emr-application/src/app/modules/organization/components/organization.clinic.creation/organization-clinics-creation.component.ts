import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../administration/model/user/user';
import { SingleAddressComponent } from '../../../common/components/single.address/single-address.component';
import { Clinic } from '../../../patient/models/clinic';
import { ClinicDataHolder } from '../../../patient/models/clinic.data.holder';
import { AdministratorDoctor } from '../../models/administrator.doctor';
import { OrganizationService } from '../../services/organization.service';
import { CreateAdministratorDoctorComponent } from './administrator.doctor.create/create-administrator-doctor.component';
export interface Doctor {
  name?: string,
  npi?: string;
}
@Component({
  selector: 'app-organization-clinics-creation',
  templateUrl: './organization-clinics-creation.component.html',
  styleUrls: ['./organization-clinics-creation.component.css']
})
export class OrganizationClinicsCreationComponent implements OnInit {
  @ViewChild('clinicAddress') clinicAddress: SingleAddressComponent;
  administratorDoctor: AdministratorDoctor
  @Input() selectedclinics: Clinic[]
  public users: User[];
  validAddress: boolean = true;
  submitted: boolean = false;
  createDoctorVisible: boolean = false;
  createdClinic: Clinic = {
    name: '',
    address: {
      addressType: null,
      country: null
    }
  };
  @ViewChild('clinicForm') clinicForm: NgForm;

  clinics: Clinic[];
  clinicDataHolders: ClinicDataHolder[] = []
  clinicDataHolder: ClinicDataHolder = {}
  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.organizationService.adminDoctor$.subscribe(result => {
      this.administratorDoctor = result
    })
    if (this.selectedclinics) {
      this.selectedclinics.forEach((clinic: any) => {
        var clinicDataHolder: ClinicDataHolder = {}
        console.log(JSON.stringify(clinic))
        clinicDataHolder.clinicModel = clinic.clinicModel
        this.clinicDataHolders.push(clinicDataHolder)
      })
    }
    else
      this.clinics = []
  }
  add() {
    if (this.clinicForm.valid && this.createdClinic.administratorDoctor !== undefined) {
      this.createdClinic.address = this.clinicAddress.getAddress();
      const { administratorDoctor, selected, generatedId, ...clinicModel } = this.createdClinic;
      this.clinicDataHolder.clinicModel = clinicModel;
      this.clinicDataHolder.clinicModel = this.createdClinic;
      this.clinicDataHolder.administratorDoctor = this.administratorDoctor
      this.clinicDataHolders.push(this.clinicDataHolder);
      this.clearAll();
    } else {
      this.submitted = true;
    }
  }
  clearClinic() {
    this.createdClinic = {
      name: '',
      address: {}
    };
  }
  clearAll() {
    this.clearClinic();
    this.clinicForm.reset();
    this.clinicAddress.resetSingleAddressForm();
    this.submitted = false
  }
  remove(index: number) {
    this.clinics.splice(index, 1);
  }
  handleCreateDoctorChange(event: any) {
    this.createDoctorVisible = event;
  }
  closeCreateDoctorModal() {
    this.createDoctorVisible = !this.createDoctorVisible;
  }
  openCreateDoctorModal() {
    this.createDoctorVisible = !this.createDoctorVisible;
  }
  handleCloseDoctorModal(event: any) {
    this.clinicDataHolder.administratorDoctor = this.createdClinic.administratorDoctor;
    this.createdClinic.administratorDoctor = event
    this.closeCreateDoctorModal();
  }

}
