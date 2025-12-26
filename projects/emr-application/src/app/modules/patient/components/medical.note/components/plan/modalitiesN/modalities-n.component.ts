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
    "children": [{
      "label": "Pre-Modulated",
      "value": "pre_modulated",
      "formControlName": "modalities_pre_modulated"
    },
    {
      "label": "High Volt",
      "value": "high_volt",
      "formControlName": "modalities_high_volt"
    },
    {
      "label": "Interferential",
      "value": "interferential",
      "formControlName": "modalities_interferential"
    },
    {
      "label": "Russian",
      "value": "russian",
      "formControlName": "modalities_russian"
    },
    {
      "label": "Other",
      "value": "other",
      "formControlName": "modalities_other"
    }]
  },
  {
    "label": "Ultrasound/Phonophoresis",
    "value": "ultrasound_phonophoresis",
    "formControlName": "modalities_ultrasound_phonophoresis",
    "showChildren": false,
    "children": [{
      "label": "1MHz",
      "value": "1mhz",
      "formControlName": "procedure_1mhz"
    },
    {
      "label": "2MHz",
      "value": "2mhz",
      "formControlName": "procedure_2mhz"
    },
    {
      "label": "3MHz",
      "value": "3mhz",
      "formControlName": "procedure_3mhz"
    }, {
      label: 'Intensity',
      value: 'intensity',
      formControlName: 'modalities_intensity',
      childType: 'select',
      selectOptions: [
        { value: '', label: 'select' },
        { value: '.5_w_cm²', label: '.5 w/cm²' },
        { value: '.6_w_cm²', label: '.6 w/cm²' },
        { value: '.7_w_cm²', label: '.7 w/cm²' },
        { value: '.8_w_cm²', label: '.8 w/cm²' },
        { value: '.9_w_cm²', label: '.9 w/cm²' },
        { value: '1.0_w_cm²', label: '1.0 w/cm²' },
        { value: '1.1_w_cm²', label: '1.1 w/cm²' },
        { value: '1.2_w_cm²', label: '1.2 w/cm²' },
        { value: '1.3_w_cm²', label: '1.3 w/cm²' },
        { value: '1.4_w_cm²', label: '1.4 w/cm²' },
        { value: '1.5_w_cm²', label: '1.5 w/cm²' },
        { value: '1.6_w_cm²', label: '1.6 w/cm²' },
        { value: '1.7_w_cm²', label: '1.7 w/cm²' },
        { value: '1.8_w_cm²', label: '1.8 w/cm²' },
        { value: '1.9_w_cm²', label: '1.9 w/cm²' },
        { value: '2.0_w_cm²', label: '2.0 w/cm²' }
      ]
    },
    {
      label: 'Duty Cycle',
      value: 'duty_cycle',
      formControlName: 'modalities_duty_cycle',
      childType: 'select',
      selectOptions: [
        { value: '', label: 'Select' },
        { value: '10_%', label: '10%' },
        { value: '20_%', label: '20%' },
        { value: '30_%', label: '30%' },
        { value: '40_%', label: '40%' },
        { value: '50_%', label: '50%' },
        { value: '60_%', label: '60%' },
        { value: '70_%', label: '70%' },
        { value: '80_%', label: '80%' },
        { value: '90_%', label: '90%' },
        { value: '100_%', label: '100%' }
      ]
    }, {
      label: 'Duration',
      value: 'duration',
      formControlName: 'modalities_duration',
      childType: 'select',
      selectOptions: [
        { value: '', label: ' ' },
        { value: '3_minutes', label: '3 minutes' },
        { value: '4_minutes', label: '4 minutes' },
        { value: '5_minutes', label: '5 minutes' },
        { value: '6_minutes', label: '6 minutes' },
        { value: '7_minutes', label: '7 minutes' },
        { value: '8_minutes', label: '8 minutes' },
        { value: '9_minutes', label: '9 minutes' },
        { value: '10_minutes', label: '10 minutes' },
        { value: '11_minutes', label: '11 minutes' },
        { value: '12_minutes', label: '12 minutes' },
        { value: '13_minutes', label: '13 minutes' },
        { value: '14_minutes', label: '14 minutes' },
        { value: '15_minutes', label: '15 minutes' },
        { value: 'custom', label: 'Custom' }
      ]
    }
    ]
  },
  {
    "label": "Laser",
    "value": "laser",
    "formControlName": "modalities_laser",
    "showChildren": false,
    "children": [{
      "label": "Cold Laser",
      "value": "cold_laser",
      "formControlName": "procedure_cold_laser"
    },
    {
      "label": "Class 4 Laser",
      "value": "class_4_laser",
      "formControlName": "procedure_class_4_laser"
    }]
  },
  {
    "label": "Infrared Light",
    "value": "infrared_light",
    "formControlName": "modalities_infrared_light",
    "showChildren": false,
    "children": [
      {
        label: 'Duration',
        value: 'duration',
        formControlName: 'modalities_lnfrared_light_duration',
        childType: 'select',
        selectOptions: [
          { value: '', label: 'Select' },
          { value: '3_minutes', label: '3 minutes' },
          { value: '4_minutes', label: '4 minutes' },
          { value: '5_minutes', label: '5 minutes' },
          { value: '6_minutes', label: '6 minutes' },
          { value: '7_minutes', label: '7 minutes' },
          { value: '8_minutes', label: '8 minutes' },
          { value: '9_minutes', label: '9 minutes' },
          { value: '10_minutes', label: '10 minutes' },
          { value: '11_minutes', label: '11 minutes' },
          { value: '12_minutes', label: '12 minutes' },
          { value: '13_minutes', label: '13 minutes' },
          { value: '14_minutes', label: '14 minutes' },
          { value: '15_minutes', label: '15 minutes' },
          { value: 'custom', label: 'Custom' }
        ]
      }

    ]
  },
  {
    "label": "Diathermy",
    "value": "diathermy",
    "formControlName": "modalities_diathermy",
    "showChildren": false,
    "children": [
      {
        label: 'Duration',
        value: 'duration',
        formControlName: 'modalities_diathermy_light_duration',
        childType: 'select',
        selectOptions: [
          { value: '', label: ' ' },
          { value: '3_minutes', label: '3 minutes' },
          { value: '4_minutes', label: '4 minutes' },
          { value: '5_minutes', label: '5 minutes' },
          { value: '6_minutes', label: '6 minutes' },
          { value: '7_minutes', label: '7 minutes' },
          { value: '8_minutes', label: '8 minutes' },
          { value: '9_minutes', label: '9 minutes' },
          { value: '10_minutes', label: '10 minutes' },
          { value: '11_minutes', label: '11 minutes' },
          { value: '12_minutes', label: '12 minutes' },
          { value: '13_minutes', label: '13 minutes' },
          { value: '14_minutes', label: '14 minutes' },
          { value: '15_minutes', label: '15 minutes' },
          { value: 'custom', label: 'Custom' }
        ]
      }
    ]
  },
  {
    "label": "Ultraviolet",
    "value": "ultraviolet",
    "formControlName": "modalities_ultraviolet",
    "showChildren": false,
    "children": [{
      label: 'Duration',
      value: 'duration',
      formControlName: 'modalities_ultraviolet_light_duration',
      childType: 'select',
      selectOptions: [
        { value: '', label: ' ' },
        { value: '3_minutes', label: '3 minutes' },
        { value: '4_minutes', label: '4 minutes' },
        { value: '5_minutes', label: '5 minutes' },
        { value: '6_minutes', label: '6 minutes' },
        { value: '7_minutes', label: '7 minutes' },
        { value: '8_minutes', label: '8 minutes' },
        { value: '9_minutes', label: '9 minutes' },
        { value: '10_minutes', label: '10 minutes' },
        { value: '11_minutes', label: '11 minutes' },
        { value: '12_minutes', label: '12 minutes' },
        { value: '13_minutes', label: '13 minutes' },
        { value: '14_minutes', label: '14 minutes' },
        { value: '15_minutes', label: '15 minutes' },
        { value: 'custom', label: 'Custom' }
      ]
    }]
  },
  {
    "label": "Vasopneumatic",
    "value": "vasopneumatic",
    "formControlName": "modalities_vasopneumatic",
    "showChildren": false,
    "children": [
      {
        label: 'Duration',
        value: 'duration',
        formControlName: 'modalities_vasopneumatic_light_duration',
        childType: 'select',
        selectOptions: [
          { value: '', label: ' ' },
          { value: '3_minutes', label: '3 minutes' },
          { value: '4_minutes', label: '4 minutes' },
          { value: '5_minutes', label: '5 minutes' },
          { value: '6_minutes', label: '6 minutes' },
          { value: '7_minutes', label: '7 minutes' },
          { value: '8_minutes', label: '8 minutes' },
          { value: '9_minutes', label: '9 minutes' },
          { value: '10_minutes', label: '10 minutes' },
          { value: '11_minutes', label: '11 minutes' },
          { value: '12_minutes', label: '12 minutes' },
          { value: '13_minutes', label: '13 minutes' },
          { value: '14_minutes', label: '14 minutes' },
          { value: '15_minutes', label: '15 minutes' },
          { value: 'custom', label: 'Custom' }
        ]
      }
    ]
  },
  {
    "label": "Biofeedback Training",
    "value": "biofeedback_training",
    "formControlName": "modalities_biofeedback_training",
    "showChildren": false,
    "children": [
      {
        label: 'Duration',
        value: 'duration',
        formControlName: 'modalities_biofeedback_training_light_duration',
        childType: 'select',
        selectOptions: [
          { value: '', label: ' ' },
          { value: '3_minutes', label: '3 minutes' },
          { value: '4_minutes', label: '4 minutes' },
          { value: '5_minutes', label: '5 minutes' },
          { value: '6_minutes', label: '6 minutes' },
          { value: '7_minutes', label: '7 minutes' },
          { value: '8_minutes', label: '8 minutes' },
          { value: '9_minutes', label: '9 minutes' },
          { value: '10_minutes', label: '10 minutes' },
          { value: '11_minutes', label: '11 minutes' },
          { value: '12_minutes', label: '12 minutes' },
          { value: '13_minutes', label: '13 minutes' },
          { value: '14_minutes', label: '14 minutes' },
          { value: '15_minutes', label: '15 minutes' },
          { value: 'custom', label: 'Custom' }
        ]
      }
    ]
  },
  {
    "label": "Whirlpool",
    "value": "whirlpool",
    "formControlName": "modalities_whirlpool",
    "showChildren": false,
    "children": [
      {
        "label": "Warm",
        "value": "warm",
        "formControlName": "modalities_whirlpool_warm"
      },
      {
        "label": "Cold",
        "value": "cold",
        "formControlName": "modalities_whirlpool_cold"
      },
      {
        label: 'Duration',
        value: 'duration',
        formControlName: 'modalities_whirlpool_duration',
        childType: 'select',
        selectOptions: [
          { value: '', label: ' ' },
          { value: '3_minutes', label: '3 minutes' },
          { value: '4_minutes', label: '4 minutes' },
          { value: '5_minutes', label: '5 minutes' },
          { value: '6_minutes', label: '6 minutes' },
          { value: '7_minutes', label: '7 minutes' },
          { value: '8_minutes', label: '8 minutes' },
          { value: '9_minutes', label: '9 minutes' },
          { value: '10_minutes', label: '10 minutes' },
          { value: '11_minutes', label: '11 minutes' },
          { value: '12_minutes', label: '12 minutes' },
          { value: '13_minutes', label: '13 minutes' },
          { value: '14_minutes', label: '14 minutes' },
          { value: '15_minutes', label: '15 minutes' },
          { value: 'custom', label: 'Custom' }
        ]
      }
    ]
  },
  {
    "label": "Paraffin Bath",
    "value": "paraffin_bath",
    "formControlName": "modalities_paraffin_bath",
    "showChildren": false,
    "children": [
      {
        label: 'Duration',
        value: 'duration',
        formControlName: 'modalities_paraffin_bath_duration',
        childType: 'select',
        selectOptions: [
          { value: '', label: ' ' },
          { value: '3_minutes', label: '3 minutes' },
          { value: '4_minutes', label: '4 minutes' },
          { value: '5_minutes', label: '5 minutes' },
          { value: '6_minutes', label: '6 minutes' },
          { value: '7_minutes', label: '7 minutes' },
          { value: '8_minutes', label: '8 minutes' },
          { value: '9_minutes', label: '9 minutes' },
          { value: '10_minutes', label: '10 minutes' },
          { value: '11_minutes', label: '11 minutes' },
          { value: '12_minutes', label: '12 minutes' },
          { value: '13_minutes', label: '13 minutes' },
          { value: '14_minutes', label: '14 minutes' },
          { value: '15_minutes', label: '15 minutes' },
          { value: 'custom', label: 'Custom' }
        ]
      }
    ]
  },
  {
    "label": "Cryotherapy",
    "value": "cryotherapy",
    "formControlName": "modalities_cryotherapy",
    "showChildren": false,
    "children": [
      {
        "label": "Ice Pack",
        "value": "ice_pack",
        "formControlName": "modalities_cryotherapy_ice_pack"
      },
      {
        "label": "Ice Massage",
        "value": "ice_massage",
        "formControlName": "modalities_cryotherapy_ice_massage"
      },
      {
        label: 'Duration',
        value: 'duration',
        formControlName: 'modalities_cryotherapy_duration',
        childType: 'select',
        selectOptions: [
          { value: '', label: ' ' },
          { value: '3_minutes', label: '3 minutes' },
          { value: '4_minutes', label: '4 minutes' },
          { value: '5_minutes', label: '5 minutes' },
          { value: '6_minutes', label: '6 minutes' },
          { value: '7_minutes', label: '7 minutes' },
          { value: '8_minutes', label: '8 minutes' },
          { value: '9_minutes', label: '9 minutes' },
          { value: '10_minutes', label: '10 minutes' },
          { value: '11_minutes', label: '11 minutes' },
          { value: '12_minutes', label: '12 minutes' },
          { value: '13_minutes', label: '13 minutes' },
          { value: '14_minutes', label: '14 minutes' },
          { value: '15_minutes', label: '15 minutes' },
          { value: 'custom', label: 'Custom' }
        ]
      }
    ]
  },
  {
    "label": "Hot Packs",
    "value": "hot_packs",
    "formControlName": "modalities_hot_packs",
    "showChildren": false,
    "children": [
      {
        label: 'Duration',
        value: 'duration',
        formControlName: 'modalities_hot_packs_duration',
        childType: 'select',
        selectOptions: [
          { value: '', label: ' ' },
          { value: '3_minutes', label: '3 minutes' },
          { value: '4_minutes', label: '4 minutes' },
          { value: '5_minutes', label: '5 minutes' },
          { value: '6_minutes', label: '6 minutes' },
          { value: '7_minutes', label: '7 minutes' },
          { value: '8_minutes', label: '8 minutes' },
          { value: '9_minutes', label: '9 minutes' },
          { value: '10_minutes', label: '10 minutes' },
          { value: '11_minutes', label: '11 minutes' },
          { value: '12_minutes', label: '12 minutes' },
          { value: '13_minutes', label: '13 minutes' },
          { value: '14_minutes', label: '14 minutes' },
          { value: '15_minutes', label: '15 minutes' },
          { value: 'custom', label: 'Custom' }
        ]
      }
    ]
  },
  {
    "label": "Mechanical Traction",
    "value": "mechanical_traction",
    "formControlName": "modalities_mechanical_traction",
    "showChildren": false,
    "children": [
      {
        "label": "Cervical",
        "value": "cervical",
        "formControlName": "modalities_mechanical_cervical"
      },
      {
        "label": "Lumbar",
        "value": "lumbar",
        "formControlName": "modalities_mechanical_lumbar"
      }

    ]
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
