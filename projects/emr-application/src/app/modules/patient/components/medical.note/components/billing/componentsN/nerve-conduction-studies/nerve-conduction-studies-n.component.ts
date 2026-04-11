import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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

  // Ids of custom codes rendered in the template. Each id maps to 4 form
  // controls: custom_<id>_name, custom_<id>_code, custom_<id>_checked, custom_<id>_notes.
  customCodeIds: string[] = [];
  private customCodeCounter = 0;

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
    if (!this.nerveConductionStudiesData?.codes || !this.NerveConductionStudiesForm) return;

    // Clear any previously-rendered custom code rows before re-patching so
    // repeated patches do not accumulate duplicates.
    this.clearCustomCodes();

    this.nerveConductionStudiesData.codes.forEach(item => {
      if (item.isCustom) {
        this.addCustomCode({
          name: item.name || '',
          code: item.code || '',
          isCheck: item.isCheck || false,
          note: item.note || ''
        });
        return;
      }

      const checkedControl = this.NerveConductionStudiesForm.get(item.code + '_checked');
      const notesControl = this.NerveConductionStudiesForm.get(item.code + '_notes');
      if (checkedControl) {
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

  // ---------------- Custom codes ----------------

  addCustomCode(initial?: { name: string; code: string; isCheck: boolean; note: string }): void {
    if (!this.NerveConductionStudiesForm) return;

    const id = 'c' + (++this.customCodeCounter);
    const nameKey = this.customControlKey(id, 'name');
    const codeKey = this.customControlKey(id, 'code');
    const checkedKey = this.customControlKey(id, 'checked');
    const notesKey = this.customControlKey(id, 'notes');

    this.NerveConductionStudiesForm.addControl(nameKey, new FormControl(initial?.name ?? ''));
    this.NerveConductionStudiesForm.addControl(codeKey, new FormControl(initial?.code ?? ''));
    this.NerveConductionStudiesForm.addControl(checkedKey, new FormControl(initial?.isCheck ?? false));
    this.NerveConductionStudiesForm.addControl(notesKey, new FormControl(initial?.note ?? ''));

    this.customCodeIds.push(id);
  }

  removeCustomCode(id: string): void {
    if (!this.NerveConductionStudiesForm) return;

    const suffixes: Array<'name' | 'code' | 'checked' | 'notes'> = ['name', 'code', 'checked', 'notes'];
    suffixes.forEach(suffix => {
      const key = this.customControlKey(id, suffix);
      if (this.NerveConductionStudiesForm.contains(key)) {
        this.NerveConductionStudiesForm.removeControl(key);
      }
    });

    this.customCodeIds = this.customCodeIds.filter(existing => existing !== id);
  }

  isCustomChecked(id: string): boolean {
    return !!this.NerveConductionStudiesForm?.get(this.customControlKey(id, 'checked'))?.value;
  }

  customControlKey(id: string, suffix: 'name' | 'code' | 'checked' | 'notes'): string {
    return 'custom_' + id + '_' + suffix;
  }

  private clearCustomCodes(): void {
    if (!this.NerveConductionStudiesForm) {
      this.customCodeIds = [];
      return;
    }
    Object.keys(this.NerveConductionStudiesForm.controls)
      .filter(key => key.startsWith('custom_'))
      .forEach(key => this.NerveConductionStudiesForm.removeControl(key));
    this.customCodeIds = [];
  }
}
