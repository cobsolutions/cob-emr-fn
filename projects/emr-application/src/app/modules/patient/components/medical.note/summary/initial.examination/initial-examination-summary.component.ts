import { Component, Input, OnInit } from '@angular/core';
import { MedicalNoteSummaryService } from '../../../../services/medical.note/summary/medical-note-summary.service';

interface Diagnosis {
  code: string;
  description: string;
}

interface Subjective {
  basicInformation: {
    'Visit Number': number;
    'Primary Concern/Chief Complaint': string;
    'Date of Initial Examination': string;
    Diagnosis: Diagnosis[];
  };
  pain: {
    'Pain Scale': string;
    'Pain Comment': string;
    'Aggravating Factors': string[];
    'Relieving Factors': string[];
  };
}

interface Objective {
  omtScores: {
    examName: string;
    scoreValue: { scoreName: string; scoreValue: number }[];
  }[];
}

interface AssessmentSummary {
  problems: string[];
  shortTermGoals: string[];
  longTermGoals: string[];
  assessmentDiagnosis: string;
  patientEducation: string;
  rehabPotential: string;
}

interface PlanOfCare {
  frequency: string;
  duration: string;
  plan: string;
  physicianSignature: boolean;
  createPlanOfCare: boolean;
  procedures: Record<string, string[]>;
  modalities: Record<string, string[]>;
}

interface PatientData {
  patientName: string;
  dob: string;
  insuranceName: string;
  providerNumber: string;
}

interface InitJson {
  subjective: Subjective;
  objective: Objective;
  assessmentSummary: AssessmentSummary;
  planOfCare: PlanOfCare;
  patientData: PatientData;
}
@Component({
  selector: 'initial-examination-summary',
  templateUrl: './initial-examination-summary.component.html',
  styleUrls: ['./initial-examination-summary.component.css']
})
export class InitialExaminationSummaryComponent implements OnInit {
  @Input() id: number
  @Input() data!: any;
  proceduresEntries: { key: string; values: string[] }[] = [];
  modalitiesEntries: { key: string; values: string[] }[] = [];
  constructor(private medicalNoteSummaryService: MedicalNoteSummaryService) { }

  ngOnInit(): void {
    this.medicalNoteSummaryService.FindInitialExaminationSummary(this.id).subscribe((data:any)=>{
      this.data = data
      if (this.data?.planOfCare) {
        this.proceduresEntries = this.objectToEntries(this.data.planOfCare.procedures);
        this.modalitiesEntries = this.objectToEntries(this.data.planOfCare.modalities);
      }
    })
  }
  private objectToEntries(obj?: Record<string, string[]>): { key: string; values: string[] }[] {
    if (!obj) return [];
    return Object.keys(obj).map(key => ({ key, values: obj[key] ?? [] }));
  }

}
