import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { NERVECONDUCTIONSTUDIES_CODES_DATA } from './NERVECONDUCTIONSTUDIES_CODES_DATA';
import { nerveConductionStudies } from '../../model/nerveConductionStudies';

@Component({
  selector: 'billing-nerve-conduction-studies-n',
  templateUrl: './nerve-conduction-studies-n.component.html',
  styleUrls: ['./nerve-conduction-studies-n.component.css']
})
export class NerveConductionStudiesNComponent implements OnInit, OnChanges {
  NerveConductionStudiesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() nerveConductionStudiesData: nerveConductionStudies;

  billingCPTCodeList: BillingCPTCode[] = [];
  checkedCodes: Map<string, boolean> = new Map();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nerveConductionStudiesData'] && this.nerveConductionStudiesData && this.NerveConductionStudiesForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    console.log('nerveConductionStudiesData ' , this.nerveConductionStudiesData)
    if (!this.nerveConductionStudiesData?.codes || !this.NerveConductionStudiesForm) return;
    this.nerveConductionStudiesData.codes.forEach(item => {
      const checkedControl = this.NerveConductionStudiesForm.get(item.code + '_checked');
      const notesControl = this.NerveConductionStudiesForm.get(item.code + '_notes');
      if (checkedControl) {
        console.log('item ', item.code, 'item.isCheck ', item.isCheck)   
        checkedControl.setValue(item.isCheck);
        this.checkedCodes.set(item.code, item.isCheck || false);
      }
      if (notesControl) {
        notesControl.setValue(item.note || '');
      }
    });
  }

  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt + '_checked'] = [false];
      formControls[code.cpt + '_notes'] = [''];
      this.checkedCodes.set(code.cpt, false);
    });

    this.NerveConductionStudiesForm = this.fb.group(formControls);
    this.formReady.emit(this.NerveConductionStudiesForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = NERVECONDUCTIONSTUDIES_CODES_DATA;
  }
  onCheckboxChange(cpt: string, event: any) {
    const isChecked = event.target.checked;
    this.checkedCodes.set(cpt, isChecked);
  }

  isChecked(cpt: string): boolean {
    return this.checkedCodes.get(cpt) || false;
  }
}
