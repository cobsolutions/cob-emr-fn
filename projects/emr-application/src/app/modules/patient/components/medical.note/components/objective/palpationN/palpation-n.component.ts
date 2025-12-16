import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'palpation-n',
  templateUrl: './palpation-n.component.html',
  styleUrls: ['./palpation-n.component.css']
})
export class PalpationNComponent implements OnInit {
  palpationTestForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  showPalpationFields: boolean = false;
  showAdditionalCommentsFields: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
  }
  initForm() {
    this.palpationTestForm = this.fb.group({
      palpation: ['no'],
      additional_comments: ['no']
    })
  }
  setupValueChangeListeners() {
    this.palpationTestForm.get('palpation')?.valueChanges.subscribe(value => {
      this.showPalpationFields = value === 'yes';
    });
    
    this.palpationTestForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsFields = value === 'yes';
    });
  }

}
