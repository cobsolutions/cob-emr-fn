import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PalpationConfig } from './config';


@Component({
  selector: 'palpation-n',
  templateUrl: './palpation-n.component.html',
  styleUrls: ['./palpation-n.component.css']
})
export class PalpationNComponent implements OnInit {
  palpationTestForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  readonly PalpationConfig = PalpationConfig

  showPalpationFields: boolean = false;
  showPalpationTemperaturPpalpationFields: boolean = false;
  showAdditionalCommentsFields: boolean = false;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
  }
  initForm() {
    this.palpationTestForm = this.fb.group({

      palpation: ['no'],
      temperature_palpation: ['no'],

      additional_comments: ['no'],
      additional_comments_text: ['']
    })
  }
  setupValueChangeListeners() {
    this.palpationTestForm.get('palpation')?.valueChanges.subscribe(value => {
      this.showPalpationFields = value === 'yes';
    });
    this.palpationTestForm.get('temperature_palpation')?.valueChanges.subscribe(value => {
      this.showPalpationTemperaturPpalpationFields = value === 'yes';
    });

    this.palpationTestForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.showAdditionalCommentsFields = value === 'yes';
    });
  }

}
