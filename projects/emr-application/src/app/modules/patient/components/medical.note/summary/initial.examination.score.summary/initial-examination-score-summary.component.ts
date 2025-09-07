import { Component, Input, OnInit } from '@angular/core';
import { MedicalNoteSummaryService } from '../../../../services/medical.note/summary/medical-note-summary.service';

@Component({
  selector: 'initial-examination-score-summary',
  templateUrl: './initial-examination-score-summary.component.html',
  styleUrls: ['./initial-examination-score-summary.component.css']
})
export class InitialExaminationScoreSummaryComponent implements OnInit {
  @Input() id:number
  scoreData:any
  constructor(private medicalNoteSummaryService:MedicalNoteSummaryService) { }

  ngOnInit(): void {
    this.medicalNoteSummaryService.FindInitialExaminationScore(this.id).subscribe(data=>{
      this.scoreData = data
    })
  }

}
