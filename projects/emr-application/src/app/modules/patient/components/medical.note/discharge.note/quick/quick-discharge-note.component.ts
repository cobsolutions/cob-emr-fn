import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'quick-discharge-note',
  templateUrl: './quick-discharge-note.component.html',
  styleUrls: ['./quick-discharge-note.component.css']
})
export class QuickDischargeNoteComponent implements OnInit {
  dischargeForm!: FormGroup;
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.years = this.generateYears(2020, 2030);

    this.dischargeForm = this.fb.group({
      dischargeDate: [Validators.required],
      numberOfVisits: [0, [Validators.required, Validators.min(0)]],
      reason: ['', Validators.required]
    });
  }
  private generateYears(start: number, end: number): number[] {
    const years = [];
    for (let y = start; y <= end; y++) {
      years.push(y);
    }
    return years;
  }
}
