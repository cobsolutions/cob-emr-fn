import { Component, Input, OnInit } from '@angular/core';
import { MedicalNoteSummaryService } from '../../../../services/medical.note/summary/medical-note-summary.service';

@Component({
  selector: 'initial-examination-plan-summary',
  templateUrl: './initial-examination-plan-summary.component.html',
  styleUrls: ['./initial-examination-plan-summary.component.css']
})
export class InitialExaminationPlanSummaryComponent implements OnInit {
  @Input() id: number
  planData: any
  constructor(private medicalNoteSummaryService: MedicalNoteSummaryService) { }

  ngOnInit(): void {
    this.medicalNoteSummaryService.findInitialExaminationPlanOfCare(this.id).subscribe(data=>{
      this.planData = data
    })
  }

}
