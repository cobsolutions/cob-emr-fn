import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'billing-code-number',
  templateUrl: './billing-code-number.component.html',
  styleUrls: ['./billing-code-number.component.css']
})
export class BillingCodeNumberComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  @Input() cpt!: string;           // e.g. "97010"
  @Input() label!: string;         // e.g. "Hot/Cold Pack"
  @Input() data: any;              // Optional: prefill data [{cpt, quantity, description}]
  @Output() valueChange = new EventEmitter<{ cpt: string; quantity: number }>();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      quantity: [''],
      description: ['']
    });
  }
  ngOnInit(): void {
    // Prefill existing data if found
    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i] !== null && this.data[i].cpt === this.cpt) {
          this.form.get('quantity').setValue(this.data[i].quantity)
          Promise.resolve().then(() => {
            this.form.get('description')?.setValue(this.data[i].description);
          });
        }
      }
    }

    // Listen for form changes
    this.form.valueChanges.subscribe(value => {
      const { quantity, description } = value;

      if (quantity && Number(quantity) > 0) {
        // Add or update the control in parent form
        if (!this.parentForm.get(this.parentFieldName)) {
          this.parentForm.addControl(
            this.parentFieldName,
            this.fb.group({
              cpt: this.cpt,
              quantity: quantity,
              description: description
            })
          );
        } else {
          this.parentForm.get(this.parentFieldName)?.patchValue({
            cpt: this.cpt,
            quantity: quantity,
            description: description
          });
        }
      } else {
        // Remove control if empty
        if (this.parentForm.get(this.parentFieldName)) {
          this.parentForm.removeControl(this.parentFieldName);
        }
      }
    })
  }

}
