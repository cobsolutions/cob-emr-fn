import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { LoggedInService } from '../../../security/service/loggedIn/logged-in.service';
import { CaseDiagnosis } from '../../models/case/case.diagnosis';
import { PateintResponse } from '../../models/response/patient.response';
import { PatientFinderService } from '../../services/patient/patient-finder.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  patientId: number;
  patient: any
  selectedCase: number;
  editAuthVisibility: boolean = false
  constructor(private route: ActivatedRoute, private patientFinderService: PatientFinderService, private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId'))
    console.log(this.patientId)
    this.loggedInService.selectedClinic$
      .pipe(
        filter(clinicId => clinicId != null),
        switchMap((clinicId) => this.patientFinderService.getPatient(this.patientId, clinicId)))
      .subscribe((response: PateintResponse) => {
        this.patient = response.records
      }, error => {
      })
  }

  editAuth(caseId: number) {
    this.selectedCase = caseId
    this.editAuthVisibility = true
  }
  toggleEditAuth() {
    this.editAuthVisibility = !this.editAuthVisibility;
  }


  deleteAddress(_t22: number) {
    throw new Error('Method not implemented.');
  }
  addAddress() {
    throw new Error('Method not implemented.');
  }
  deleteContact(_t32: number) {
    throw new Error('Method not implemented.');
  }
  addContact() {
    throw new Error('Method not implemented.');
  }
  deleteIdentification(_t42: number) {
    throw new Error('Method not implemented.');
  }
  addIdentification() {
    throw new Error('Method not implemented.');
  }
  deleteInsurance(_t52: number) {
    throw new Error('Method not implemented.');
  }
  addInsurance() {
    throw new Error('Method not implemented.');
  }
  deleteCase(_t62: number) {
    throw new Error('Method not implemented.');
  }
  addCase() {
    throw new Error('Method not implemented.');
  }
  deleteClinic(_t72: number) {
    throw new Error('Method not implemented.');
  }
  addClinic() {
    throw new Error('Method not implemented.');
  }
  replaceUnderscoreWithSpace(input: string): string {
    if (!input) {
      return input;
    }
    return input.includes("_") ? input.replace(/_/g, " ") : input;
  }
  formatAmericanAddress(address: any): string {
    if (!address) return '';

    const parts: string[] = [];

    // Line 1: First + Second Address
    if (address.firstAddress) {
      parts.push(address.firstAddress.trim());
    }
    if (address.secondAddress) {
      parts.push(address.secondAddress.trim());
    }

    // Line 2: City + State + Zip
    const cityStateZip: string[] = [];
    if (address.city) {
      cityStateZip.push(address.city.trim());
    }
    if (address.state) {
      cityStateZip.push(address.state.trim());
    }
    if (address.zipCode) {
      cityStateZip.push(address.zipCode.trim());
    }
    if (cityStateZip.length > 0) {
      parts.push(cityStateZip.join(', '));
    }

    // Line 3: Country (optional, usually omitted for US domestic)
    if (address.country && address.country.toLowerCase() !== 'united states of america') {
      parts.push(address.country.trim());
    }

    return parts.join('\n');
  }
  formatDiagnosisList(diagnoses: CaseDiagnosis[]): string {
    if (!diagnoses || diagnoses.length === 0) {
      return '';
    }

    return diagnoses
      .map(d => d.diagnosisCode.trim())
      .join(', ');
  }
  changeFacilityVisibility(event: any) {
    console.log(event )
    if (event === 'close')
      this.editAuthVisibility = false;
  }
}
