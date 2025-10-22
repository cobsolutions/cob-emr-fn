import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'top-right-left-selects',
  templateUrl: './top-right-left-selects.component.html',
  styleUrls: ['./top-right-left-selects.component.css']
})
export class TopRightLeftSelectsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() parentFieldName: string;
  form: FormGroup;
  @Input() topControls: any[] = [];
  @Input() controlR: any[] = [];
  @Input() controlL: any[] = [];

  @Input() columns: number = 2;
  @Input() rightLabel: string = 'Right';
  @Input() leftLabel: string = 'Left';
  @Input() showLabel: boolean = true;
  @Input() hasComment: boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    if (this.showLabel === undefined)
      this.showLabel = true
    if (this.hasComment === undefined)
      this.hasComment = false
    if (this.topControls !== undefined)
      this.topControls.forEach(control => {
        const key = `top_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(key, new FormControl(control.value[0].val));
        this.handleValueChanges(key);
      });

    // Right controls
    if (this.controlR.length > 0)
      this.controlR.forEach(control => {
        const key = `right_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(key, new FormControl(control?.value[0].val));
        this.handleValueChanges(key);
      });

    // Left controls
    if (this.controlL.length > 0)
      this.controlL.forEach(control => {
        const key = `left_${this.toCamelCase(control.label)}_${this.parentFieldName}`;
        this.form.addControl(key, new FormControl(control?.value[0].val));
        this.handleValueChanges(key);
      });
    if (this.hasComment) {
      const key = `comment_${this.parentFieldName}`;
      this.form.addControl(key, new FormControl(null));
    }
    setTimeout(() => {
      this.form.patchValue(this.parentForm.get(this.parentFieldName).value);
    }, 10);
  }
  toCamelCase(value: string): string {
    return value.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());
  }
  getControlName(side: 'right' | 'left' | 'top', label: string): string {
    return `${side}_${this.toCamelCase(label)}_${this.parentFieldName}`;
  }
  getCommentName(): string {
    return `comment_${this.parentFieldName}`;
  }
  private handleValueChanges(controlName: string) {
    const sub = this.form.get(controlName).valueChanges.subscribe(value => {
      const customControlName = `${controlName}_custom`;
  
      if (value === 'Custom' && !this.form.get(customControlName)) {
        // ✅ Add the input FormControl
        this.form.addControl(customControlName, new FormControl(''));
  
        // ✅ Subscribe to its changes as well
        const customSub = this.form.get(customControlName).valueChanges.subscribe(customValue => {
          this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
        });
        this.subscriptions.push(customSub);
      }
  
      // ✅ If changed to non-custom value, remove control
      if (value !== 'Custom' && this.form.get(customControlName)) {
        this.form.removeControl(customControlName);
      }
  
      // ✅ Always sync parent form
      this.parentForm.get(this.parentFieldName)?.setValue(this.form.getRawValue());
    });
  
    this.subscriptions.push(sub);
  }
}
