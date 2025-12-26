import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HierarchyCheckboxOption } from '../common/interface/hierarchy-checkbox-option';

@Component({
  selector: 'plan-specialties-n',
  templateUrl: './specialties-n.component.html',
  styleUrls: ['./specialties-n.component.css']
})
export class SpecialtiesNComponent implements OnInit {
  SpecialtiesForm: FormGroup;
  specialtiesOptions: HierarchyCheckboxOption[] = [
    {
      "label": "Orthotic Fabrication",
      "value": "orthotic_fabrication",
      "formControlName": "modalities_orthotic_fabrication",
      "showChildren": false,
      "children": []
    },
    {
      "label": "TENS Fitting",
      "value": "tens_fitting",
      "formControlName": "modalities_tens_fitting",
      "showChildren": false,
      "children": []
    },
    {
      "label": "Acupuncture",
      "value": "acupuncture",
      "formControlName": "modalities_acupuncture",
      "showChildren": false,
      "children": []
    },
    {
      "label": "Other",
      "value": "other",
      "formControlName": "modalities_other",
      "showChildren": false,
      "children": []
    }
  ]
  @Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.formReady.emit(this.SpecialtiesForm);
  }
  initForm() {
    this.SpecialtiesForm = this.fb.group({});
  }

}
