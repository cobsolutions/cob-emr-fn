import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { UNTIMED_CODES_DATA } from './untimed-codes.data';
import { untimedCodes } from '../../model/untimedCodes';
import { SubItem } from '../../model/common/check.cpt.code';

@Component({
  selector: 'billing-untimed-codes-n',
  templateUrl: './untimed-codes-n.component.html',
  styleUrls: ['./untimed-codes-n.component.css']
})
export class UntimedCodesNComponent implements OnInit, OnChanges {
  UntimedCodes: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() untimedCodesData: untimedCodes;

  billingCPTCodeList: BillingCPTCode[] = [];
  checkedCodes: Map<string, boolean> = new Map();
  checkedSubItems: Map<string, boolean> = new Map();

  // Hardcoded sub-items for specific CPT codes
  cptSubItems: { code: string; children: string[] }[] = [
    { code: "97010", children: ["Hot", "Cold"] },
    { code: "97014", children: ["Pre-Modulated", "High Volt", "Interferential", "Russian", "Other"] },
    { code: "G0283", children: ["Pre-Modulated", "High Volt", "Interferential", "Russian", "Other"] }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['untimedCodesData'] && this.untimedCodesData && this.UntimedCodes) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.untimedCodesData?.codes || !this.UntimedCodes) return;
    this.untimedCodesData.codes.forEach(item => {
      const checkedControl = this.UntimedCodes.get(item.code + '_checked');
      const notesControl = this.UntimedCodes.get(item.code + '_notes');
      if (checkedControl) {
        const checkValue = item.isCheck;
        checkedControl.setValue(checkValue);
        this.checkedCodes.set(item.code, item.isCheck || false);
      }
      if (notesControl) {
        notesControl.setValue(item.note || '');
      }
      // Patch sub-items (array format)
      if (item.subItems && item.subItems.length > 0) {
        item.subItems.forEach(subItem => {
          const controlName = item.code + '_sub_' + subItem.name;
          const subControl = this.UntimedCodes.get(controlName);
          if (subControl) {
            subControl.setValue(subItem.isCheck);
            this.checkedSubItems.set(controlName, subItem.isCheck);
          }
        });
      }
    });
  }

  loadCPTCodes() {
    this.billingCPTCodeList = UNTIMED_CODES_DATA;
  }

  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt + '_checked'] = [false];
      formControls[code.cpt + '_notes'] = [''];
      this.checkedCodes.set(code.cpt, false);

      // Add form controls for sub-items
      const subItems = this.getSubItems(code.cpt);
      subItems.forEach(subItem => {
        const subKey = code.cpt + '_sub_' + subItem;
        formControls[subKey] = [false];
        this.checkedSubItems.set(subKey, false);
      });
    });

    this.UntimedCodes = this.fb.group(formControls);
    this.formReady.emit(this.UntimedCodes);
  }

  getSubItems(cpt: string): string[] {
    const found = this.cptSubItems.find(item => item.code === cpt);
    return found ? found.children : [];
  }

  onSubCheckboxChange(cpt: string, subItem: string, event: any) {
    const subKey = cpt + '_sub_' + subItem;
    const isChecked = event.target.checked;
    this.checkedSubItems.set(subKey, isChecked);
  }

  onCheckboxChange(cpt: string, event: any) {
    const isChecked = event.target.checked;
    this.checkedCodes.set(cpt, isChecked);
  }

  isChecked(cpt: string): boolean {
    return this.checkedCodes.get(cpt) || false;
  }

  getSubItemsValues(cpt: string): SubItem[] | null {
    const subItems = this.getSubItems(cpt);
    if (subItems.length === 0) return null;

    const result: SubItem[] = [];
    subItems.forEach(subItem => {
      const controlName = cpt + '_sub_' + subItem;
      const control = this.UntimedCodes.get(controlName);
      result.push({
        name: subItem,
        isCheck: control?.value || false
      });
    });
    return result;
  }

}
