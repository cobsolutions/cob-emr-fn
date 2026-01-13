import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PalpationConfig } from './config';
import { Palpation } from './model/Palpation';
import { PalpationMapperService } from './service/palpation-mapper.service';


@Component({
  selector: 'palpation-n',
  templateUrl: './palpation-n.component.html',
  styleUrls: ['./palpation-n.component.css']
})
export class PalpationNComponent implements OnInit {
  palpationTestForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() palpationData?: Palpation;
  formData: any = {};
  readonly PalpationConfig = PalpationConfig

  showPalpationFields: boolean = false;
  showPalpationTemperaturPpalpationFields: boolean = false;
  showAdditionalCommentsFields: boolean = false;

  constructor(private fb: FormBuilder,
    private palpationMapperService: PalpationMapperService) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    console.log('palpation', this.palpationData)
    if (this.palpationData) {
      this.formData = this.palpationMapperService.fromDto(this.palpationData);
      this.palpationTestForm.patchValue(this.formData); // Single patch - child components will use formData
    }
    this.formReady.emit(this.palpationTestForm);
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
