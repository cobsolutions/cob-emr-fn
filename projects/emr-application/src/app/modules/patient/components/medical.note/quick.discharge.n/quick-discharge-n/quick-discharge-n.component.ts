import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { LoggedInService } from '../../../../../security/service/loggedIn/logged-in.service';
import { FinalizeMedicalNoteRequest } from '../../../../models/medical.note/finalize.medical.note.request';
import { MedicalNoteRequest } from '../../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
import { QuickDischargeRequest } from '../../../../models/medical.note/quick.discharge.request';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { QuickDischargeNoteService } from '../../../../services/medical.note/quick.discharge/quick-discharge-note.service';

@Component({
  selector: 'quick-discharge-n',
  templateUrl: './quick-discharge-n.component.html',
  styleUrls: ['./quick-discharge-n.component.css']
})
export class QuickDischargeNComponent implements OnInit {
  dischargeForm!: FormGroup;
  @Output() back = new EventEmitter<void>();
  @Output() backToRecord = new EventEmitter<void>();
  @Input() medicalNoteId: number;
  @Input() noteId: string;
  @Input() caseId: string;
  @Input() patientName: string;
  creator: string;
  noteFinalizr: string;
  forwardVisibility: boolean = false;
  finalizeNoteVisibility: boolean = false;
  noteType: MedicalNoteType = MedicalNoteType.Quick_Discharge_Note;
  medicalNoteRequest: any;
  private finalizeSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private medialNoteService: MedialNoteService,
    private loggedInService: LoggedInService,
    private toastr: ToastrService,
    private quickDischargeNoteService: QuickDischargeNoteService
  ) { }

  ngOnDestroy() {
    this.finalizeSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.dischargeForm = this.fb.group({
      dateOfDischarge: [null, Validators.required],
      numberOfVisit: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });

    if (this.noteId) {
      this.quickDischargeNoteService.get(this.noteId).subscribe((data: any) => {
        console.log('data', data)
        this.creator = data.createdAt;
        this.noteFinalizr = data.finalizedBy;
        this.dischargeForm.get('numberOfVisit').setValue(data.visitNumber);
        this.dischargeForm.get('description').setValue(data.description);
        if (data.dateOfDischarge) {
          this.dischargeForm.get('dateOfDischarge').setValue(data.dateOfDischarge);
        }
      });
    }
  }

  soapActions(action: string) {
    if (action === 'back') {
      this.backtoPatientRecordActions();
    }
    if (action === 'draft') {
      this.draft();
    }
  }

  backtoPatientRecordActions() {
    this.back.emit();
  }

  private buildMedicalNoteModel(): MedicalNoteRequest {
    const quickDischargeRequest: QuickDischargeRequest = {
      dischargeDate: moment(this.dischargeForm.get('dateOfDischarge').value).unix() * 1000,
      numberOfVisits: this.dischargeForm.get('numberOfVisit').value,
      comment: this.dischargeForm.get('description').value
    };
    const medicalNoteRequest: MedicalNoteRequest = {
      patientCaseId: this.caseId,
      id: this.medicalNoteId,
      quickDischargeRequest: quickDischargeRequest
    };
    return medicalNoteRequest;
  }

  draft() {
    this.draftAction().subscribe(data => {
      this.medialNoteService.notifyDraft(true);
      this.backtoPatientRecordActions();
    });
  }

  draftAction(): Observable<any> {
    const request = {
      patientCaseId: this.caseId,
      dateOfDischarge: this.dischargeForm.get('dateOfDischarge').value,
      description: this.dischargeForm.get('description').value
    };
    return this.quickDischargeNoteService.draft(request, this.noteId);
  }

  toggleFrowardModal() {
    this.forwardVisibility = !this.forwardVisibility;
  }

  changeVisibility(event: string) {
    if (event === 'close') {
      this.forwardVisibility = false;
    }
  }

  togglefinalize() {
    this.finalizeNoteVisibility = !this.finalizeNoteVisibility;
  }

  changeFinalizeNoteVisibility(event: any) {
    if (event === 'no') {
      this.finalizeNoteVisibility = false;
    }
    if (event === 'yes') {
      this.finalizeNoteVisibility = false;
      this.toastr.success('Medical note has been finalized');
      // Delay navigation to allow the modal to properly clean up and remove body scroll lock
      setTimeout(() => {
        this.backtoPatientRecordActions();
      }, 100);
    }
  }

  finalize() {
    this.medicalNoteRequest = {
      patientCaseId: this.caseId,
      dateOfDischarge: this.dischargeForm.get('dateOfDischarge').value,
      description: this.dischargeForm.get('description').value
    };
    this.finalizeNoteVisibility = true;
  }
}
