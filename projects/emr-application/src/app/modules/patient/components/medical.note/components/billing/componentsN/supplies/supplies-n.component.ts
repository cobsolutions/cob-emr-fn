import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { Supplies_CODES_DATA } from './Supplies_CODES_DATA';
import { supplies } from '../../model/supplies';

@Component({
  selector: 'billing-supplies-n',
  templateUrl: './supplies-n.component.html',
  styleUrls: ['./supplies-n.component.css']
})
export class SuppliesNComponent implements OnInit, OnChanges {
  SuppliesForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() suppliesData: supplies;

  billingCPTCodeList: BillingCPTCode[] = [];

  customCodeIds: string[] = [];
  private customCodeCounter = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCPTCodes();
    this.initForm();
    this.patchFormData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['suppliesData'] && this.suppliesData && this.SuppliesForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.suppliesData?.codes || !this.SuppliesForm) return;

    this.clearCustomCodes();

    this.suppliesData.codes.forEach(item => {
      if (item.isCustom) {
        this.addCustomCode({
          name: item.name || '',
          code: item.code || '',
          quantity: item.quantity ?? null,
          note: item.note || ''
        });
        return;
      }

      const quantityControl = this.SuppliesForm.get(item.code);
      const notesControl = this.SuppliesForm.get(item.code + '_notes');
      if (quantityControl) {
        quantityControl.setValue(item.quantity || null);
      }
      if (notesControl) {
        notesControl.setValue(item.note || '');
      }
    });
  }

  initForm() {
    const formControls: any = {};

    this.billingCPTCodeList.forEach(code => {
      formControls[code.cpt] = [null];
      formControls[code.cpt + '_notes'] = [''];
    });

    this.SuppliesForm = this.fb.group(formControls);
    this.formReady.emit(this.SuppliesForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = Supplies_CODES_DATA;
  }

  // ---------------- Custom codes ----------------

  addCustomCode(initial?: { name: string; code: string; quantity: number | null; note: string }): void {
    if (!this.SuppliesForm) return;

    const id = 'c' + (++this.customCodeCounter);
    this.SuppliesForm.addControl(this.customControlKey(id, 'name'), new FormControl(initial?.name ?? ''));
    this.SuppliesForm.addControl(this.customControlKey(id, 'code'), new FormControl(initial?.code ?? ''));
    this.SuppliesForm.addControl(this.customControlKey(id, 'quantity'), new FormControl(initial?.quantity ?? null));
    this.SuppliesForm.addControl(this.customControlKey(id, 'notes'), new FormControl(initial?.note ?? ''));

    this.customCodeIds.push(id);
  }

  removeCustomCode(id: string): void {
    if (!this.SuppliesForm) return;

    const suffixes: Array<'name' | 'code' | 'quantity' | 'notes'> = ['name', 'code', 'quantity', 'notes'];
    suffixes.forEach(suffix => {
      const key = this.customControlKey(id, suffix);
      if (this.SuppliesForm.contains(key)) {
        this.SuppliesForm.removeControl(key);
      }
    });

    this.customCodeIds = this.customCodeIds.filter(existing => existing !== id);
  }

  customControlKey(id: string, suffix: 'name' | 'code' | 'quantity' | 'notes'): string {
    return 'custom_' + id + '_' + suffix;
  }

  private clearCustomCodes(): void {
    if (!this.SuppliesForm) {
      this.customCodeIds = [];
      return;
    }
    Object.keys(this.SuppliesForm.controls)
      .filter(key => key.startsWith('custom_'))
      .forEach(key => this.SuppliesForm.removeControl(key));
    this.customCodeIds = [];
  }
}
