import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BasicComponent } from 'projects/emr-application/src/app/util/basic.component';
import { filter, map, Observable, switchMap } from 'rxjs';
import { InsuranceCompany } from '../../../../administration/model/insurance.company/insurance.company';
import { InsuranceCompanyService } from '../../../../administration/services/insurance.company/insurance-company.service';
import { PaymentType } from '../../../../common/models/enums/payment.type';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { PatientInsurance } from '../../../models/insurance/patient.insurance';
import { Patient } from '../../../models/patient';
import { PatientFinderService } from '../../../services/patient/patient-finder.service';

@Component({
  selector: 'app-patient-insurance-info',
  templateUrl: './patient-insurance-info.component.html',
  styleUrls: ['./patient-insurance-info.component.css']
})
export class PatientInsuranceInfoComponent extends BasicComponent implements OnInit, AfterViewInit {
  PaymentTypes = PaymentType;
  @Input() patient: Patient;
  @Input() componentRole: string[]
  insuranceCompanies: Observable<InsuranceCompany[]>;
  patientInsurance: PatientInsurance = {
    id: null,
    insuranceNumber: '',
    groupNumber: '',
    paymentType: null,
    paymentValue: '',
    totalDeductible: '',
    visitAllowed: null,
    expirationDate: null,
    expirationDate_Date: null,
    insuranceCompany: null
  }
  @ViewChild('insuranceForm') insuranceForm: NgForm;
  constructor(private patientFinderService: PatientFinderService
    , private loggedInService: LoggedInService
    , private insuranceCompanyService: InsuranceCompanyService
    ,) { super() }
  ngAfterViewInit(): void {
    this.setForm(this.insuranceForm)
  }

  ngOnInit(): void {
    this.insuranceCompanies = this.insuranceCompanyService.findAll().pipe(
      map((result: any) => { return result.body })
    );
  }

  add() {
    if (this.insuranceForm.valid) {
      let pushedPatientInsurance: PatientInsurance = Object.assign({}, this.patientInsurance);
      this.patient.patientInsuranceModels.push(pushedPatientInsurance);
      this.insuranceForm.reset();
    }
  }
  remove(index: number) {
    this.patient.patientInsuranceModels.splice(index, 1);
  }
}
