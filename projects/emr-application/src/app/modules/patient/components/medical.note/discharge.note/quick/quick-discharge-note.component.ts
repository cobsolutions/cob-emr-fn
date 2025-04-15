import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'quick-discharge-note',
  templateUrl: './quick-discharge-note.component.html',
  styleUrls: ['./quick-discharge-note.component.css']
})
export class QuickDischargeNoteComponent implements OnInit {
  dischargeForm!: FormGroup;
  @Output() back = new EventEmitter<void>();
  @Input() medicalNoteId: number
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dischargeForm = this.fb.group({
      dischargeDate: [Validators.required],
      numberOfVisits: [0, [Validators.required, Validators.min(0)]],
      reason: ['', Validators.required]
    });
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

  }
}
