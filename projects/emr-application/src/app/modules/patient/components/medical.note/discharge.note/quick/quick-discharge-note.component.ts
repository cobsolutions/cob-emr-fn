import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MedicalNoteRequest } from '../../../../models/medical.note/medical.note.request';
import { QuickDischargeRequest } from '../../../../models/medical.note/quick.discharge.request';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';

@Component({
  selector: 'quick-discharge-note',
  templateUrl: './quick-discharge-note.component.html',
  styleUrls: ['./quick-discharge-note.component.css']
})
export class QuickDischargeNoteComponent implements OnInit {
  dischargeForm!: FormGroup;
  @Output() back = new EventEmitter<void>();
  @Input() medicalNoteId: number
  @Input() caseId: number
  constructor(private fb: FormBuilder
    , private medialNoteService: MedialNoteService) { }

  ngOnInit(): void {
    this.dischargeForm = this.fb.group({
      dischargeDate: [Validators.required],
      numberOfVisits: [0, [Validators.required, Validators.min(0)]],
      reason: ['', Validators.required]
    });
    if (this.medicalNoteId !== undefined)
      this.medialNoteService.findMedicalNoteType(this.medicalNoteId).subscribe((data: any) => {
        this.dischargeForm.get('numberOfVisits').setValue(data.numberOfVisits);
        this.dischargeForm.get('reason').setValue(data.comment)
        const formattedDate = moment.unix(data.dischargeDate / 1000).format('YYYY-MM-DD');
        this.dischargeForm.get('dischargeDate').setValue(formattedDate);
      })
  }
  soapActions(action: string) {
    if (action === 'back')
      this.backtoPatientRecordActions()
    if (action === 'draft')
      this.draft();
  }
  backtoPatientRecordActions() {
    this.back.emit();
  }
  private draft() {
    var quickDischargeRequest: QuickDischargeRequest = {
      dischargeDate: moment(this.dischargeForm.get('dischargeDate').value).unix() * 1000,
      numberOfVisits: this.dischargeForm.get('numberOfVisits').value,
      comment: this.dischargeForm.get('reason').value
    }
    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: this.caseId,
      id: this.medicalNoteId,
      quickDischargeRequest: quickDischargeRequest
    }
    this.medialNoteService.draft(medicalNoteRequest).subscribe(data => {
      this.backtoPatientRecordActions();
    })
  }
}
