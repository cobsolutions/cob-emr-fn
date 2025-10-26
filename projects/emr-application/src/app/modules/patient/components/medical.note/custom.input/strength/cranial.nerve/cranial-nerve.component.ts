import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cranial-nerve',
  templateUrl: './cranial-nerve.component.html',
  styleUrls: ['./cranial-nerve.component.css']
})
export class CranialNerveComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() parentFieldName!: string;
  @Input() controls: any[] = [];
  @Input() dependentOptions:any
  form: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }
  // dependentOptions: { [key: string]: string[] } = {
  //   'Unilateral Smell (CN 1)': ['Anosmia', 'Paraosmia'],
  //   'Confrontation (CN 2)': ['Loss', 'Field Defect'],
  //   'Hall-Pike (CN 8 Coch)': ['Left Nystagmus', 'Right Nystagmus'],
  //   'Finger Rustle (CN 8 Coch)': ['Absent', 'Reduced', 'Normal'],
  //   'Bone Conduction (CN 8 Coch)': ['Absent', 'Reduced'],
  //   'Convergence (CN 3,4,6)': ['Convergent', 'Divergent'],
  //   'Facial Sensation (CN 5)': ['Decreased', 'Absent'],
  //   'Jaw Jerk / Clonus (CN 5)': ['Brisk', 'Absent'],
  //   'Smile (CN 7)': ['Weakness', 'Asymmetry'],
  //   'Frown (CN 7)': ['Weakness', 'Asymmetry'],
  //   'Body Tilt (CN 8 Vest)': ['Left Tilt', 'Right Tilt'],
  //   'Swallowing (CN 9)': ['Difficulty', 'Choking'],
  //   'Uvula Test (CN 10)': ['Deviation Left', 'Deviation Right'],
  //   'Trapezius / SCM (CN 11)': ['Weakness Left', 'Weakness Right'],
  //   'Tongue Protrusion (CN 12)': ['Deviation Left', 'Deviation Right']
  // };

  ngOnInit(): void {
    // Initialize all base controls
    this.controls.forEach(ctrl => {
      const key = this.toCamelCase(ctrl.label);
      this.form.addControl(key, new FormControl(ctrl.value[0].val));
      this.handleValueChanges(ctrl, key);
    });

    // Sync with parent
    setTimeout(() => {
      const existing = this.parentForm.get(this.parentFieldName)?.value;
      if (existing) this.form.patchValue(existing);
    }, 10);
  }
  private handleValueChanges(ctrl: any, key: string) {
    const sub = this.form.get(key)!.valueChanges.subscribe(value => {
      const depKey = `${key}_dependent`;
      const textKey = `${key}_text`;

      if (value === 'T548_2') {
        // Add dependent select if missing
        if (!this.form.get(depKey)) {
          this.form.addControl(depKey, new FormControl(null));
          this.form.get(depKey)!.valueChanges.subscribe((value) => {
            this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
          })
        }
        // Add text input if missing
        if (!this.form.get(textKey)) {
          this.form.addControl(textKey, new FormControl(''));
          this.form.get(textKey)!.valueChanges.subscribe((value) => {
            this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
          })
        }
      } else {
        // Remove when not "Positive"
        if (this.form.get(depKey)) this.form.removeControl(depKey);
        if (this.form.get(textKey)) this.form.removeControl(textKey);
      }

      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });

    this.subscriptions.push(sub);
  }

  getDependentOptions(label: string): string[] {
    return this.dependentOptions[label] || [];
  }

  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (_, g1) => g1.toUpperCase()).replace(/[()]/g, '').replace(/[,\/]/g, '');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
