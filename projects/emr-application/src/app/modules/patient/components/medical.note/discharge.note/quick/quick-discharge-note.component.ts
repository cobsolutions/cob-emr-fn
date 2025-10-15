import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { FinalizeMedicalNoteRequest } from '../../../../models/medical.note/finalize.medical.note.request';
import { MedicalNoteRequest } from '../../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
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
  @Output() backToRecord = new EventEmitter<void>();
  @Input() medicalNoteId: number
  @Input() caseId: number
  @Input() patientName: string
  creator: string
  noteFinalizr: string
  forwardVisibility: boolean = false;
  finalizeNoteVisibility: boolean = false;
  noteType: MedicalNoteType = MedicalNoteType.Quick_Discharge_Note
  private finalizeSub!: Subscription;
  constructor(private fb: FormBuilder
    , private medialNoteService: MedialNoteService
    , private loggedInService: LoggedInService
    , private toastr: ToastrService) { }

  ngOnDestroy() {
    this.finalizeSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.finalizeSub = this.medialNoteService.finalize$.subscribe((status) => {
      if (status) {
        const finalizeRequest: FinalizeMedicalNoteRequest = {
          caseId: this.caseId,
          id: this.medicalNoteId,
          noteType: MedicalNoteType.Quick_Discharge_Note,
          finalizedBy: this.loggedInService.getLoggedUser().uuid
        }
        this.draftAction().subscribe(d => {
          this.medialNoteService.finalizea(finalizeRequest).subscribe(v => {
            this.backtoPatientRecordActions();
          });
        });
      }
    })
    this.dischargeForm = this.fb.group({
      dischargeDate: [Validators.required],
      numberOfVisits: [0, [Validators.required, Validators.min(0)]],
      reason: ['', Validators.required]
    });
    if (this.medicalNoteId !== undefined)
      this.medialNoteService.findMedicalNoteType(this.medicalNoteId).subscribe((data: any) => {
        console.log(JSON.stringify(data))
        this.creator = data.createdBy;
        this.noteFinalizr = data.finalizedBy;
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
  private buildMedicalNoteModel(): MedicalNoteRequest {
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
    return medicalNoteRequest
  }
  draft() {
    this.draftAction().subscribe(data => {
      this.backtoPatientRecordActions();
    })
  }
  draftAction(): Observable<any> {
    var medicalNoteRequest: MedicalNoteRequest = this.buildMedicalNoteModel();
    return this.medialNoteService.draft(medicalNoteRequest);
  }
  toggleFrowardModal() {
    this.forwardVisibility = !this.forwardVisibility
  }
  changeVisibility(event: string) {
    if (event === 'close') {
      this.forwardVisibility = false;
    }
  }
  togglefinalize() {
    this.finalizeNoteVisibility = !this.finalizeNoteVisibility
  }

  changeFinalizeNoteVisibility(event: any) {
    if (event === 'no') {
      this.finalizeNoteVisibility = false
    }
    if (event === 'yes') {
      this.finalizeNoteVisibility = false
      this.toastr.success('Medical note has been finalized'); 
    }
  }
  finalize() {
    this.finalizeNoteVisibility = true;
  }

}
