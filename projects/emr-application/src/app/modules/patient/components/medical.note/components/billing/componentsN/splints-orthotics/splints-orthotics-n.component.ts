import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BillingCPTCode } from '../interface/billing-cpt-code';
import { SplintsOrthotics_CODES_DATA } from './SplintsOrthotics_CODES_DATA';
import { splintsorthotics } from '../../model/splintsorthotics';

@Component({
  selector: 'billing-splints-orthotics-n',
  templateUrl: './splints-orthotics-n.component.html',
  styleUrls: ['./splints-orthotics-n.component.css']
})
export class SplintsOrthoticsNComponent implements OnInit, OnChanges {

  SplintsOrthoticsForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() splintsOrthoticsData: splintsorthotics;

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
    if (changes['splintsOrthoticsData'] && this.splintsOrthoticsData && this.SplintsOrthoticsForm) {
      this.patchFormData();
    }
  }

  patchFormData(): void {
    if (!this.splintsOrthoticsData?.codes || !this.SplintsOrthoticsForm) return;

    this.clearCustomCodes();

    this.splintsOrthoticsData.codes.forEach(item => {
      if (item.isCustom) {
        this.addCustomCode({
          name: item.name || '',
          code: item.code || '',
          quantity: item.quantity ?? null,
          note: item.note || ''
        });
        return;
      }

      const quantityControl = this.SplintsOrthoticsForm.get(item.code);
      const notesControl = this.SplintsOrthoticsForm.get(item.code + '_notes');
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

    this.SplintsOrthoticsForm = this.fb.group(formControls);
    this.formReady.emit(this.SplintsOrthoticsForm);
  }
  loadCPTCodes() {
    this.billingCPTCodeList = SplintsOrthotics_CODES_DATA;
  }

  // ---------------- Custom codes ----------------

  addCustomCode(initial?: { name: string; code: string; quantity: number | null; note: string }): void {
    if (!this.SplintsOrthoticsForm) return;

    const id = 'c' + (++this.customCodeCounter);
    this.SplintsOrthoticsForm.addControl(this.customControlKey(id, 'name'), new FormControl(initial?.name ?? ''));
    this.SplintsOrthoticsForm.addControl(this.customControlKey(id, 'code'), new FormControl(initial?.code ?? ''));
    this.SplintsOrthoticsForm.addControl(this.customControlKey(id, 'quantity'), new FormControl(initial?.quantity ?? null));
    this.SplintsOrthoticsForm.addControl(this.customControlKey(id, 'notes'), new FormControl(initial?.note ?? ''));

    this.customCodeIds.push(id);
  }

  removeCustomCode(id: string): void {
    if (!this.SplintsOrthoticsForm) return;

    const suffixes: Array<'name' | 'code' | 'quantity' | 'notes'> = ['name', 'code', 'quantity', 'notes'];
    suffixes.forEach(suffix => {
      const key = this.customControlKey(id, suffix);
      if (this.SplintsOrthoticsForm.contains(key)) {
        this.SplintsOrthoticsForm.removeControl(key);
      }
    });

    this.customCodeIds = this.customCodeIds.filter(existing => existing !== id);
  }

  customControlKey(id: string, suffix: 'name' | 'code' | 'quantity' | 'notes'): string {
    return 'custom_' + id + '_' + suffix;
  }

  private clearCustomCodes(): void {
    if (!this.SplintsOrthoticsForm) {
      this.customCodeIds = [];
      return;
    }
    Object.keys(this.SplintsOrthoticsForm.controls)
      .filter(key => key.startsWith('custom_'))
      .forEach(key => this.SplintsOrthoticsForm.removeControl(key));
    this.customCodeIds = [];
  }
}
