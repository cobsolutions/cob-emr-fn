import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'title-checkbox-list',
  templateUrl: './title-checkbox-list.component.html',
  styleUrls: ['./title-checkbox-list.component.css']
})
export class TitleCheckboxListComponent implements OnInit {

 // Required inputs
 @Input() title!: string;
 @Input() labels!: string[];
 @Input() formGroup!: FormGroup;
 
 // Optional inputs with defaults
 @Input() fieldPrefix: string = '';
 @Input() showNormalCheckbox: boolean = true;
 @Input() showComments: boolean = true;
 @Input() commentsLabel: string = 'Comments';
 @Input() commentsFieldName?: string;
 @Input() normalFieldName?: string;
 @Input() initialData?: any; // Initial values for controls

 constructor(private fb: FormBuilder) {}

 ngOnInit(): void {
   // Validate required inputs
   if (!this.title) {
     console.warn('MuscleAssessmentComponent: title input is required');
   }
   
   if (!this.labels || !Array.isArray(this.labels)) {
     console.warn('MuscleAssessmentComponent: labels input must be an array');
     this.labels = [];
   }
   
   if (!this.formGroup) {
     console.error('MuscleAssessmentComponent: formGroup input is required');
     return;
   }
   
   this.ensureFormControlsExist();
 }

 private ensureFormControlsExist(): void {
   // Add Normal checkbox control if needed
   if (this.showNormalCheckbox) {
     const normalFieldName = this.getNormalFieldName();
     const rawValue = this.initialData?.[normalFieldName];
     const initialValue = this.normalizeCheckboxValue(rawValue);
     if (!this.formGroup.get(normalFieldName)) {
       this.formGroup.addControl(normalFieldName, this.fb.control(initialValue));
     }
   }

   // Add controls for each label
   if (this.labels && this.labels.length > 0) {
     this.labels.forEach((label, index) => {
       const fieldName = this.getFieldName(label, index);
       const rawValue = this.initialData?.[fieldName];
       const initialValue = this.normalizeCheckboxValue(rawValue);
       if (!this.formGroup.get(fieldName)) {
         this.formGroup.addControl(fieldName, this.fb.control(initialValue));
       }
     });
   }

   // Add comments control if needed
   if (this.showComments) {
     const commentsFieldName = this.getCommentsFieldName();
     const initialValue = this.initialData?.[commentsFieldName] || '';
     if (!this.formGroup.get(commentsFieldName)) {
       this.formGroup.addControl(commentsFieldName, this.fb.control(initialValue));
     }
   }
 }

 /**
  * Normalize checkbox values: convert 'yes'/'no' or true/false to boolean
  */
 private normalizeCheckboxValue(value: any): boolean {
   if (value === 'yes' || value === true || value === 'true') return true;
   if (value === 'no' || value === false || value === 'false') return false;
   return false;
 }

 /**
  * Generate form control name for a checkbox field
  */
 getFieldName(label: string, index: number): string {
   const cleanLabel = this.cleanString(label);
   return `${this.fieldPrefix}${cleanLabel}`;
 }

 /**
  * Generate form control name for Normal checkbox
  */
 getNormalFieldName(): string {
   return this.normalFieldName || `${this.fieldPrefix}normal`;
 }

 /**
  * Generate form control name for comments field
  */
 getCommentsFieldName(): string {
   return this.commentsFieldName || `${this.fieldPrefix}comments`;
 }

 /**
  * Clean string for use in field name
  */
 private cleanString(str: string): string {
   return str.toLowerCase()
     .replace(/[^a-z0-9]+/g, '_')
     .replace(/_+/g, '_')
     .replace(/^_|_$/g, '');
 }

}
