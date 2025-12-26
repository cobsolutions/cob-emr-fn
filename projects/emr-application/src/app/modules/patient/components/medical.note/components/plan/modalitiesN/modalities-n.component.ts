import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HierarchyCheckboxOption } from '../common/interface/hierarchy-checkbox-option';

@Component({
  selector: 'plan-modalities-n',
  templateUrl: './modalities-n.component.html',
  styleUrls: ['./modalities-n.component.css']
})
export class ModalitiesNComponent implements OnInit {
  ModalitiesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  modalitiesOptions: HierarchyCheckboxOption[] = [{
    "label": "Pain Relief",
    "value": "pain_relief",
    "formControlName": "modalities_pain_relief",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Decrease Inflammation",
    "value": "decrease_inflammation",
    "formControlName": "modalities_decrease_inflammation",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Increase Blood Flow",
    "value": "increase_blood_flow",
    "formControlName": "modalities_increase_blood_flow",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Improve Tissue Healing",
    "value": "improve_tissue_healing",
    "formControlName": "modalities_improve_tissue_healing",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Electrical Stimulation",
    "value": "electrical_stimulation",
    "formControlName": "modalities_electrical_stimulation",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Ultrasound/Phonophoresis",
    "value": "ultrasound_phonophoresis",
    "formControlName": "modalities_ultrasound_phonophoresis",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Laser",
    "value": "laser",
    "formControlName": "modalities_laser",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Infrared Light",
    "value": "infrared_light",
    "formControlName": "modalities_infrared_light",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Diathermy",
    "value": "diathermy",
    "formControlName": "modalities_diathermy",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Ultraviolet",
    "value": "ultraviolet",
    "formControlName": "modalities_ultraviolet",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Vasopneumatic",
    "value": "vasopneumatic",
    "formControlName": "modalities_vasopneumatic",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Biofeedback Training",
    "value": "biofeedback_training",
    "formControlName": "modalities_biofeedback_training",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Whirlpool",
    "value": "whirlpool",
    "formControlName": "modalities_whirlpool",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Paraffin Bath",
    "value": "paraffin_bath",
    "formControlName": "modalities_paraffin_bath",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Cryotherapy",
    "value": "cryotherapy",
    "formControlName": "modalities_cryotherapy",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Hot Packs",
    "value": "hot_packs",
    "formControlName": "modalities_hot_packs",
    "showChildren": false,
    "children": []
  },
  {
    "label": "Mechanical Traction",
    "value": "mechanical_traction",
    "formControlName": "modalities_mechanical_traction",
    "showChildren": false,
    "children": []
  }]
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.formReady.emit(this.ModalitiesForm);
  }
  initForm() {
    this.ModalitiesForm = this.fb.group({});
  }

}
