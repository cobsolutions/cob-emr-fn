import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasicComponent } from 'projects/emr-application/src/app/util/basic.component';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { AutoApplyModifier } from '../../../../common/models/enums/auto.apply.modifier';
import { InjuryCase } from '../../../../common/models/enums/injury.case';
import { PlaceOfService } from '../../../../common/models/enums/place.service';
import { ReferringPartyType } from '../../../../common/models/enums/referring.party.type';
import { PatientCase } from '../../../models/case/patient.case';
import { Patient } from '../../../models/patient';
import { CaseDiagnosisService } from '../../../services/case-diagnosis.service';

@Component({
  selector: 'app-patient-case-info',
  templateUrl: './patient-case-info.component.html',
  styleUrls: ['./patient-case-info.component.css']
})
export class PatientCaseInfoComponent extends BasicComponent implements OnInit, AfterViewInit {
  @Input() componentRole: string[]
  @Input() pateint: Patient;
  @ViewChild('caseForm') caseForm: NgForm;
  case: PatientCase = {
    id: null,
    title: '',
    placeOfService: null,
    treatingDoctor: null,
    injuryCase: null,
    caseInsuranceInformation: {
      isSelfPay: false,
      selfPayAmount: null,
      primaryInsurance: null,
      secondaryInsurance: null
    },
    caseDiagnosis: [],
    referralCase: {
      referringPartyName: null,
      referringPartyNPI: null,
      phone: null,
      fax: null,
      email: null,
      referringPartyType: null,
      doctorType: ''
    },
    caseOtherInformation: {
      isAuthorized: null,
      addInfoForChart: null,
      autoApplyModifier: null
    }
  }
  palceOfServices = PlaceOfService;
  injuryCase = InjuryCase;
  referringParty = ReferringPartyType;
  autoApplyModifier = AutoApplyModifier;
  filteredDiagnosis: any;
  isLoading = false;
  options: any;
  diagnosisCtrl = new FormControl();
  diagnosisCode: string[] = [];
  constructor(private caseDiagnosisService: CaseDiagnosisService,
    private spinner: NgxSpinnerService) {
    super();
  }
  ngAfterViewInit(): void {
    this.setForm(this.caseForm);
  }

  ngOnInit(): void {

    this.diagnosisCtrl.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 1) {
            return true
          } else {
            this.filteredDiagnosis = [];
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.filteredDiagnosis = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          this.spinner.show();
          return this.caseDiagnosisService.find(value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
        }
        )
      )
      .subscribe(data => {
        this.spinner.hide();
        if (data == undefined) {
          this.filteredDiagnosis = [];
        } else {
          var diagnosisResponse: any = data;
          this.filteredDiagnosis = diagnosisResponse.listOfCodeName;
        }
      },
        error => {
          this.isLoading = false
        });
  }
  addICD10diagnosis(diagnosis: any) {
    diagnosis.forEach((element: string) => {
      var code: string = element.split(',')[0]
      var desrciption: string = element.split(',')[1]
      const exists: boolean = this.case.caseDiagnosis?.findIndex(element => element.diagnosisCode === code) > -1;
      if (!exists || this.case.caseDiagnosis.length === 0)
        this.case.caseDiagnosis?.push({
          diagnosisCode: code,
          diagnosisDescription: desrciption
        })
    });
  }
  add() {
    if (this.caseForm.valid) {
      let patientCase: PatientCase = Object.assign({}, this.case);
      patientCase.caseInsuranceInformation = Object.assign({}, this.case.caseInsuranceInformation);
      patientCase.referralCase = Object.assign({}, this.case.referralCase);
      patientCase.caseOtherInformation = Object.assign({}, this.case.caseOtherInformation);
      this.pateint.cases.push(patientCase);
      this.caseForm.reset();
    }
  }
  remove(index: number) {
    this.pateint.cases.splice(index, 1);
  }

}
