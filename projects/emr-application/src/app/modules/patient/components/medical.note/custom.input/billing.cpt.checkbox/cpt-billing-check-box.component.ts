import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cpt-billing-check-box',
  templateUrl: './cpt-billing-check-box.component.html',
  styleUrls: ['./cpt-billing-check-box.component.scss']
})
export class CptBillingCheckBoxComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() cpt!: string;             // e.g., "99213"
  @Input() label!: string;           // e.g., "Office Visit"
  @Output() valueChange = new EventEmitter<{ cpt: string; checked: boolean; description: string }>();
  @Input() data: any
  description: string;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cpt: [''],
      label: [''],
      checked: [false],
      description: ['']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].cpt === this.cpt) {
          this.form.get('checked').setValue(true)
          Promise.resolve().then(() => {
            this.form.get('description')?.setValue(this.data[i].description);
          });
        }
      }
    }
    this.form.patchValue({
      cpt: this.cpt,
      label: this.label,
      description: this.description
    });
    this.form.valueChanges.subscribe(value => {

      if (value.checked) {
        if (!this.parentForm.get(this.parentFieldName)) {
          this.parentForm.addControl(
            this.parentFieldName,
            this.fb.group({
              code: this.cpt,
              checked: value.checked,
              description: value.description
            })
          );
        } else {
          this.parentForm.get(this.parentFieldName)?.patchValue({
            code: this.cpt,
            checked: value.checked,
            description: value.description
          });
        }
      } else {
        if (this.parentForm.get(this.parentFieldName)) {
          this.parentForm.removeControl(this.parentFieldName);
        }
      }
    });

  }
}
